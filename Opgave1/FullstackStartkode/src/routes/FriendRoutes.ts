import { Router } from "express";
const router = Router();

import facade from "../facades/DummyDB-Facade";

router.get("/all", async (req,res)=>{
    const friends = await facade.getAllFriends();
    const friendsDTO = friends.map((friend)=>{
        const {firstName, lastName} = friend;
        return {firstName, lastName};
    })
    res.json(friendsDTO);
});

router.get("/:email", async (req,res)=>{
    const friend = await facade.getFrind(req.params.email);
    res.json(friend);
});

router.get("/findby-username/:userid", async (req, res, next) => {
    const userId = req.params.userid;
   
    const friend = await facade.getFrind(userId);
    if (friend == null) {
      throw new Error("user not found")
    }
    const { firstName, lastName, email } = friend;
    const friendDTO = { firstName, lastName, email }
    res.json(friendDTO);
  })
  

router.post("/add", async (req,res)=>{
    let tmp = {
        id:"",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    const friend = await facade.addFriend(tmp);
    res.json(friend);
});

router.delete("/delete/:email", async (req,res)=>{
    let deleted = await facade.deleteFriend(req.params.email);
    res.json(deleted);
});

export default router;