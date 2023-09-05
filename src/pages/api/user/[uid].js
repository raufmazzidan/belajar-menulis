import { authAdmin, dbAdmin } from '@/config/firebase-admin';

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    authAdmin
      .verifyIdToken(req.headers.authorization)
      .then(() => {
        if (req.method === 'PUT') {
          const id = req.query.uid;
          const { email, password, ...body } = JSON.parse(req.body);
          authAdmin
            .updateUser(id, {
              email,
              password,
            })
            .then(() => {
              dbAdmin
                .collection('user')
                .doc(id)
                .update({
                  email: email,
                  pin: password,
                  ...body,
                })
                .then(() => {
                  res.status(200).json({
                    success: true,
                    message: 'success edit user',
                  });
                  res.end();
                  resolve();
                });
            })
            .catch((error) => {
              res.status(400).json({ message: error.message || 'users not found' });
              res.end();
              resolve();
            });
        } else if (req.method === 'DELETE') {
          const id = req.query.uid;
          authAdmin
            .deleteUser(id)
            .then(() => {
              dbAdmin
                .collection('user')
                .doc(id)
                .delete()
                .then(() => {
                  res.status(200).json({
                    success: true,
                    message: 'success delete user',
                  });
                  res.end();
                  resolve();
                });
            })
            .catch((error) => {
              res.status(400).json({ message: error.message || 'users not found' });
              res.end();
              resolve();
            });
        }
      })
      .catch((error) => {
        res.status(403).json({ message: 'token invalid' });
        res.end();
        resolve();
      });
  });
}
