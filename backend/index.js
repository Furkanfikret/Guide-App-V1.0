import express from 'express';
import cors from 'cors';
import pool from './db.js';


const app = express();
const port = 3000;



app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome Main Page Of Server !");
})

app.post("/users",async(req,res)=>{
    try {
        const { name , surname , phone , gender , note } = req.body;
        const result = await pool.query(
            'insert into users (name,surname,phone,gender,note) values($1,$2,$3,$4,$5) returning *',
        [name,surname,phone,gender,note]);
        res.status(200).json({message:'The user saved in database!',user:result.rows[0]})
    } catch (error) {
        console.log(`Record Error ! CAN NOT BEEN TAKE DATA FROM CLIENT ! ${error}`);
        res.status(500).json({error:'Server Fault !'});
    }
})

app.get("/show_all_users", async (req, res) => {
  const { arama } = req.query;

  try {
    let query = "SELECT * FROM users";
    let values = [];

    if (arama) {
      query += `
        WHERE 
          name ILIKE $1 OR 
          surname ILIKE $1 OR 
          phone ILIKE $1 OR 
          note ILIKE $1
      `;
      values.push(`%${arama}%`);
    }

    query += " ORDER BY id ASC";

    const result = await pool.query(query, values);
    res.status(200).json({ users: result.rows });
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ error: "Server error while getting users." });
  }
});


app.delete("/delete_user/:id",async(req,res)=>{
  const id = req.params.id;
  try {
    await pool.query("delete from users where id=$1",[id]);
    res.status(200).json({message:`the user of id=${id} delete !`});
  } catch (error) {
    console.log(`Èrror deleting user of id=${id}`,error);
    res.status(500).json({error:`Èrror deleting user of id=${id}`})
  }
})

app.put("/update_user/:id", (req, res) => {
  const { id } = req.params;
  const { name, surname, phone, gender, note } = req.body;
  pool.query(
    "UPDATE users SET name=$1, surname=$2, phone=$3, gender=$4, note=$5 WHERE id=$6",
    [name, surname, phone, gender, note, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Kullanıcı güncellendi");
    }
  );
});
app.listen(port,()=>{
    console.log(`The Server is running on ${port} !`);
})