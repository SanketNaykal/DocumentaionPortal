import {db} from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const setNewBlogCode = async (req, res) => {
    try{
        const q1 = 'SELECT MAX("idpost") FROM "ameyzingengineer"."post";';
        const { rows: lastID} = await db.query(q1);        
        if(lastID.length){
            let currentBlogId = (lastID[0]['MAX("idpost")']);
            let chiledExist = 'false';
            let inheritedID = [req.params.id ? req.params.id : '00'];
            let state = 'a';
            if(inheritedID[0] === '00'){
                let blogCode = "${currentBlogId}*${chiledExist}*${inheritedID}*${state}";
                const q2 = 'UPDATE "ameyzingengineer"."post" SET "code" = $1 WHERE "idpost" = $2;';
                const { rows: result } = await db.query(q2, [blogCode, currentBlogId]);
                return res.status(200).json({ data: blogCode});
            }
            else{
                let state2 = state.charCodeAt(0) + 1;
                state = String.fromCharCode(state2);
                let blogCode = "${currentBlogId}*${chiledExist}*${inheritedID}*b";
                const q2 = 'UPDATE "ameyzingengineer"."post" SET "code" = $1 WHERE "idpost" = $2;';
                const { rows: result } = await db.query(q2, [blogCode, currentBlogId]);
                chiledExist = 'true';
                let blogCode2 = "${inheritedID}*${chiledExist}*00*a";
                const { rows: result2} = await db.query(q2, [blogCode2, inheritedID[0]]);
                return res.status(200).json({ data: blogCode, blogCode2});
            }
        }
    }catch(err){
        console.error(err)
        return res.status(500).json(err)
    }
}