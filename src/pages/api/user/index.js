import { authAdmin, dbAdmin } from '@/config/firebase-admin';

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    authAdmin
      .verifyIdToken(req.headers.authorization)
      .then(() => {
        if (req.method === 'POST') {
          const { email, password, ...body } = JSON.parse(req.body);
          authAdmin
            .createUser({
              email: email,
              password: password,
            })
            .then((user) => {
              dbAdmin
                .collection('user')
                .doc(user.uid)
                .set({
                  email: email,
                  pin: password,
                  ...body,
                })
                .then(() => {
                  res.status(200).json({
                    success: true,
                    message: 'success create user',
                  });
                  res.end();
                  resolve();
                });
            })
            .catch((error) => {
              res.status(400).json({ message: error.message || 'users failed to create' });
              res.end();
              resolve();
            });
        } else {
          authAdmin
            .listUsers()
            .then((userRecord) => {
              res.status(200).json({
                data: userRecord.users,
              });
              res.end();
              resolve();
            })
            .catch((error) => {
              res.status(404).json({ message: error.message || 'users not found' });
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
