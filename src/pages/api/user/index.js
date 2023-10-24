import { authAdmin, dbAdmin } from '@/config/firebase-admin';

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    authAdmin
      .verifyIdToken(req.headers.authorization)
      .then(async (decodedToken) => {
        const uid = decodedToken.uid;
        if (req.method === 'POST') {
          const resQuest = [];
          await dbAdmin
            .collection('question')
            .where('createdBy', '=', uid)
            .where('level', '=', 1)
            .get()
            .then((res) => {
              res.forEach((doc) => resQuest.push(doc.id));
            });
          const { email, password, ...body } = JSON.parse(req.body);
          await authAdmin
            .createUser({
              email: email,
              password: password,
            })
            .then(async (user) => {
              dbAdmin
                .collection('user')
                .doc(user.uid)
                .set({
                  email: email,
                  pin: password,
                  finished: [resQuest[0]],
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
