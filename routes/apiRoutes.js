var db = require("../models");

module.exports = function (app) {
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post("/api/workouts", async (req, res) => {
    try {
      const response = await db.Workout.create({ type: "workout" });
      res.json(response);
    } catch (err) {
      console.log("workout creation unsuccessful", err);
    }
  });

  app.put("/api/workouts/:id", ({ body, params }, res) => {
    const workoutId = params.id;
    let storedExercises = [];

    db.Workout.find({ _id: workoutId })
      .then((dbWorkout) => {
        storedExercises = dbWorkout[0].exercises;
        res.json(dbWorkout[0].exercises);
        let allExercises = [...storedExercises, body];
        console.log(allExercises);
        updateWorkout(allExercises);
      })
      .catch((err) => {
        res.json(err);
      });

    function updateWorkout(exercises) {
      db.Workout.findByIdAndUpdate(
        workoutId,
        { exercises: exercises },
        function (err, doc) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
