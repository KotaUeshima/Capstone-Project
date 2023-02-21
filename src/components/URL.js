let URL
if (process.env.NODE_ENV === 'development') {
  URL = 'http://localhost:3000'
} else {
  URL = 'https://globify-backend.onrender.com'
}

export default URL
