const express = require('express');

//import pg-promise & invokes it
const pgp = require('pg-promise')();

const connectionString = 'postgres://localhost:5432/social'; // URL where Postgess is running
const db = pgp(connectionString) //Connected database instance

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let posts = await db.any('SELECT * FROM posts');
        res.json({
            payload: posts,
            message: `Success. Retrieved all user's posts.`
        });

    } catch (error) {
        res.status(500);
        res.json({
            message: `Error! Something went wrong!`
        })
       
    }
})

router.get('/:id', async (req, res) => {
    let user = req.params.id
    try {
        let posts = await db.any(`SELECT * FROM posts WHERE poster_id = '${user}'`);
        res.json({
            payload: posts,
            message: `Success! Retrieved all of user ${user}'s posts. ${posts}`
        });

    } catch (error) {
        res.status(500);
        res.json({
            message: `Error! Something went wrong!`
        })
    }
})

router.post('/register', async (req, res) => {
   
    try {
        let insertQuery = `
        INSERT INTO posts(poster_id, body)
        VALUES($1, $2)  
        ` 
        
        await db.none(insertQuery, [req.body.poster_id , req.body.body]);
       
        res.json({
            payload: req.body,
            message: `Post was registered!`
        })
    } catch (error) {
        res.json({
            message: `There was an error!`
        })
    }
})





module.exports = router;