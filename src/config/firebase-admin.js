import admin from 'firebase-admin';

// move to env
const config = {
  type: 'service_account',
  project_id: 'belajar-menulis-d9327',
  private_key_id: '9cc4722111743daf8985b3f84994b9faa5e5e49b',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2qlyUHbNeMn8J\nYzV5t6cbTQOu/oHr4OJ4JeXVsyllrB5PEE6GfUOgM8LJWfqt5YsWs2JMzjvrv43J\nmclyMeRWLIptIVD0gTWJHhE86BwdanwNS3VXUZmkIqrql+4oPuv7dzrvRlHLr6Uk\nWvSVCgKeNN4BuNh6QoHkzd09KBwirux4lAkw1GMSgNfODJ0Ubj6nUnHl0K6vn5MT\ngKAMdhwGkrKHuMsGErPf7L05LzpJit16cZLUrSW0Jd/7vB4xt1FW+2fqu0b2XDUE\nlce44BWMnSzjy+nFkkPe/sQ0sGeEgz4Z1ZTb5PXCB5mw5i8z3E9bOBGc0Ws/ZanU\n4FSH8NUZAgMBAAECggEAEB/R6nmd5tlFquiShMTBuaCFP2vHWf29qZ+l/hGBvHz1\nwFxVcJX0vVrRI+DPYFol+nvp1/mc6XtwKS64zRDhZPsrWjHGllnxH1vDmsd3pkZL\nKzzd37Z1l24/lyDDmZ+tFhAMaEKIhhavP01pT95H1+GD0JqAC97JRFv1xRtZ/6eg\ne7vvyCiSgDKKc4SyDk7ZgqWN/CshRdbz4Q8aaDh26vQc2n88q1S9rGGNOwnfEQXf\nb1nzqL4UEbYJfwlofmcdlBu7Xk4hIJhyJRNlJUyjPhiOVa3cWhJiynvhSXOjL6PZ\n2/nuWAgQnLGXLrwDatJP4HPqIx0LPBbgDqyKl2/ITwKBgQDfFv8A+sbjTNblcMH7\ngCe0EdU6vfj/r7WWW7Fon8A/VTa2Q00WZjt1k5QTfg3n0SXhXvcmkox5Oa71LQAc\n34n1npXK8ilHdWYLxz+ft50Q1hFVSw+IWCEzzAynIEulNLuemvxJpvRU3F+w340U\nZas2NYnZjeuDVoiEsvkPE9hhcwKBgQDRnLygsY1aSJNzlLgSKx2jhjlPWNLu/kaM\nJVQbCCHVlc+z/Hs2e24cNLA1uvCWbqKf7h7zLWPBFjm5y65LbuDcgTSyzri+SyFz\nXnLBUJwu/VTJkl0kERiA8Yl9pOVqHD4iIAN7fKme1RaFljuGTwrWnvGQ4hpeVHPN\nUT5sBQ5cQwKBgFlUGfPIds8ZO4tP5TzRihRed6U34HZxYyK7wIQGQ7KYann85Oct\nNG3WFBriBKtoYeSmZAx77ee0o0vlIwBsug8x2wUShljot13MALvxh+Dv9qzSi3uq\n3lChSge5tNCIFwBhStgrE/bO7zohqZobQ71HHtWQMFe81JleGMBiz+flAoGBAI9t\nnHSoiXx5pMu1u65S6lj2g0iUEuGOBF/pOv+0NNKdTB5waS8CjnmmY9ygKfgFhCnD\nGlJzgIqi1qUXhg//ssWvc4vWf/tWFXGH8yXsLrLIjbfP+wOu3wF8RQRATOqqoKlh\nFoDs8HPKgzqtbdWdSGFLKShmTny1dPfM29W2L/lZAoGAXO3HTV5FphHEZejvtExP\nKm+piLBiWdWl0dmRADM86IlCG5UeZxKmvfQTu34nyqSGkQtkSUiNHI51QxIvvpV5\nLuuMpuF2wz7ggPe6vXh+L57kKs4eJ9z2OVLOOsH4WHl74O5FuB+uCRP103SmTa95\nwOy+vEIFtnOh6xKmMRU5ElU=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-r8cil@belajar-menulis-d9327.iam.gserviceaccount.com',
  client_id: '103292942815384877266',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r8cil%40belajar-menulis-d9327.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(config),
  });
  console.log('Admin Initialized.');
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export default admin;
export const authAdmin = admin.auth();
