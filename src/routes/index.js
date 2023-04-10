const express =  require('express');
const v1AppRoutes =  require('./v1/index');

const router = express.Router();

router.use('/v1',v1AppRoutes);

module.exports = router;


