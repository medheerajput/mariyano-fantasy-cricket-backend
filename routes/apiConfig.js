
const router = require("express").Router();
const teamRoutes = require("./team/teamRoutes")
const resultRoutes = require("./result/resultRoutes")
const { swaggerServe, swaggerSetup } = require("../config/swaggerConfig")

router.use('/api/teams', teamRoutes);
router.use('/api/results', resultRoutes);

// Add Swagger UI route
router.use("/api-docs", swaggerServe, swaggerSetup); 

module.exports = router;