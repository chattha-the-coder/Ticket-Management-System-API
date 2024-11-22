const cont = require("../database/connection");
const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.urlencoded({ extended: false }));

const port = 9000;
app.use(express.json());

// app.get("/ticket", function (req, res) {
//   cont.connect(function (error) {
//     if (error) console.log(error);

//     console.log("connection established");

//     var sql = "select * from ticket";

//     cont.query(sql, function (error, data) {
//       if (error) console.log(error);
//       console.log(data);
//       res.send(data); // this is not working , data is log on the console but on postman it is not returning response.
//     });
//   });
// });

// app.post("/ticket", function (req, res) {
//   const title = req.body.Title;
//   const dis = req.body.Des;
//   const status = req.body.Status;

//   cont.connect(function (error) {
//     if (error) throw error;

//     console.log("connected to post the data");

//     var sql = `Insert INTO ticket (Title,Des,Status) VALUES ('${title}', '${dis}', '${status}')`;

//     cont.query(sql, function (error, result) {
//       if (error) throw error;
//     });

//     console.log(req.body);
//     res.json({ status: " The ticket has been sent to the server" });
//   });
// });

// // app.post("/ticket", (req, res) => {
// //   const data = req.body;
// //   console.log(data);
// //   ticket.push({ ...data, id: ticket.length + 1 });
// //   res.json(`user add with id : ${ticket.length}`);
// // });
// ``;

app
.route("/ticket/:id")  //to delete the ticket id 
.delete((req, res) => {
  const id_get = Number(req.params.id);

  const sql = "DELETE FROM ticket WHERE id = ?";
  cont.query(sql, [id_get], (error, results) => {
    if (error) {
      console.error("Error checking the database:", error.message);
      return res.send("Database error");
    }

    if (results.affectedRows === 0) {
      return res.json({ message: `No ticket found with id ${id_get}` });
    }

    res.json({ status: `User with ${id_get} is deleted from database ` });
  });
})
.patch((req, res) => {
  const id_get = Number(req.params.id);

  const title = req.body.Title;
  const dis = req.body.Des;
  const status = req.body.Status;

  const sql = `UPDATE ticket SET Title = ?, Des = ?, Status = ? WHERE id = ?`;

  cont.query(sql, [title,dis,status,id_get], (error, results) => {
    if (error) {
      console.error("Error updating the database:", error.message);
      return res.json({ message: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.json({ message: `No ticket found with id ${id_get}` });
    }

    res.json({ message: `Ticket with id ${id_get} has been updated successfully` });
  });
});

// app.get("/ticket", (req, res) => {
//   const data = req.query.status;

//   console.log("Status received:", data);

//   const status_data = ticket.filter((item) => item.status === data);
//   if (status_data.length === 0) {
//     return res.json({ message: `No ticket found with status: ${data}` });
//   }
//   res.json(status_data);
// });

app.get("/ticket", function (req, res) {
  cont.connect(function (error) {
    if (error) console.log(error);

    console.log("connection established");

    var sql = "select * from ticket";

    cont.query(sql, function (error, data) {
      if (error) console.log(error);
      console.log(data);
      res.send(data); 
    });
  });
});
//----------------------------------------------------------------------------------------------------------------------------------------------
app.get("/active", function (Req, res) {
  // ALL DATA WHICH IS ACTIVE IRRESPECTIVE OF THE ARCHIVED
  cont.connect(async function (error) {
    if (error) console.log(error);

    var sql = "select * from user where isActive=1";
    // console.log(sql);
    await cont.query(sql, function (error, data) {
      if (error) console.log(error);

      res.send(data);
    });
  });
});
app.get("/not_archive", function (Req, res) {
  // ALL DATA WHICH ARE ACTIVE   AND ARE ARCHIEVD
  cont.connect(function (error) {
    if (error) console.log(error);

    var sql = "select * from user where isActive=? AND isArchived=?";
    // console.log(sql);
    cont.query(sql, [1, 0], function (error, dataww) {
      if (error) console.log(error);

      res.send(data);
    });
  });
});

app.get("/fetch_reporter/:id", function (req, res) {
  const m_id = Number(req.params.id);
  cont.connect(function (error) {
    if (error) console.log(error);

    // var sql = "select * from ticket where reporter = ? ";
    var sql =
      "SELECT ticket.*, user.name AS reporter_name, user.isActive AS reporter_role FROM ticket INNER JOIN user ON ticket.reporter = user.id where ticket.reporter=?";

    // console.log(sql);
    cont.query(sql, [m_id], function (error, data) {
      if (error) console.log(error);

      res.send(data);
    });
  });
});

app.get("/fetch_all", function (req, res) {
  cont.connect(function (error) {
    if (error) console.log(error);
    var sql =
      "SELECT ticket.*, user.name, user.isActive ,user.isArchived FROM ticket INNER JOIN user ON ticket.reporter = user.id where user.isActive=1";

    cont.query(sql, function (error, data) {
      if (error) console.log(error);

      res.send(data);
    });
  });
});

app.get("/fetch_ticket_assigne/:id", function (req, res) {
  const m_id = Number(req.params.id);
  cont.connect(function (error) {
    if (error) console.log(error);

    var sql =
      "SELECT ticket.*, user.name AS assignee_name, user.isActive AS assginee_role FROM ticket INNER JOIN user ON ticket.assignee = user.id where ticket.assignee=?";

    cont.query(sql, [m_id], function (error, data) {
      if (error) console.log(error);

      res.send(data);
    });
  });
});

app.get("/a", function (Req, res) {
  // ALL DATA WHICH IS ACTIVE IRRESPECTIVE OF THE ARCHIVED
  cont.connect(async function (error) {
    if (error) console.log(error);

    var sql = "select  COUNT(id) from ticket GROUP BY reporter";
    // console.log(sql);
    await cont.query(sql, function (error, data) {
      if (error) console.log(error);

      res.send(data);
    });
  });
});

app.listen(port, (req, res) => {
  console.log("server started successfully");
});
