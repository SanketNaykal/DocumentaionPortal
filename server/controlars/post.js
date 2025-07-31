import {db} from '../db.js';
import jwt from 'jsonwebtoken';

export const getPost = async (req, res,) => {
    try{
        const q1 = 'SELECT "username","title","description","date" FROM "ameyzingengineer"."user" u join "ameyzingengineer"."post" p on u."iduser" = p."uid" where p."idpost"= $1;';
        const { rows: post} = await db.query(q1, [req.params.id]);
        if(post.length){
            return res.status(200).json({ data: post[0]});
        }
    }catch(err){
        console.error(err)
        return res.status(500).json(err)
    }
}
export const getPosts = async (req, res) => {
    try{
        const q1 = 'SELECT "idpost","title","date","uid","code" FROM "ameyzingengineer"."post";';
        const { rows: allPost } = await db.query(q1);
        if(allPost.length){
            return res.status(200).json({ data: allPost });
        }
    }catch (err){
        console.error(err);
        return res.status(500).json(err);
    }
}
export const addPost = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        const q1 = 'INSERT INTO "ameyzingengineer"."post" ("title", "description", "date", "uid") VALUES ($1, $2, $3, $4);';
        const { title, content, date } = req.body;
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            const result = await db.query(q1, [title, content, date, user.id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Post is not created or you do not have permission to create this post.' });
            }
            return res.status(200).json({ message: 'Post created successfully!' });
        }catch (err) {
            if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token is not valid!' });
            }
            throw err;
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}
export const updatePost = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        console.log(token);
        console.log(req.cookies.access_token);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        const q1 = 'UPDATE "ameyzingengineer"."post" SET "title" = $1, "description" = $2 WHERE "idpost" = $3;';
        const { title, content } = req.body;
        const postId = req.params.id;
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            const result = await db.query(q1, [title, content, postId]);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Post not found or you do not have permission to update this post.' });
            }
            return res.status(200).json({ message: 'Post updated successfully!' });
        }catch (err) {
            if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token is not valid!' });
            }
            throw err;
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}
export const deletePost = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        // Add your delete logic here
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            const q1 = 'DELETE FROM "ameyzingengineer"."post" WHERE "idpost" = $1 AND "uid" = $2;';
            const result = await db.query(q1, [req.params.id, user.id]);
            if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Post not found or you do not have permission to delete this post.' });
            }
        } catch (err) {
            if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token is not valid!' });
            }
            throw err;
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}
