import admin, { authAdmin } from '@/config/firebase-admin';

export default async function handler(req, res) {
  authAdmin
    .verifyIdToken(req.headers.authorization)
    .then(() => {
      authAdmin
        .listUsers()
        .then((userRecord) => {
          res.status(200).json({
            data: userRecord.users,
          });
          res.end();
        })
        .catch((error) => {
          res.status(405).json({ message: error.message || 'users not found' });
          res.end();
        });
    })
    .catch((error) => {
      res.status(403).json({ message: 'token invalid' });
      res.end();
    });
}
