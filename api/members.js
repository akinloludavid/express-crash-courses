const express = require('express')
const members = require('../database.json')
const uuid = require('uuid')
const router = express.Router()

router.get('/', (req, res) => {
  res.send(members)
})

//Get by id 

router.get('/:id', (req, res) => {
  const id = req.url.split('/')[3]

  const member = members.find(m => m._id == req.params.id)
  if (!member) res.status(400).send(`Member with given id ${id} not found`)
  res.send(member)
})

//Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }
  if (!newMember.name || !newMember.email) {
    return res.status(400).send('Mail and name are required')
  }

  members.unshift(newMember)
  //res.send(members)
  res.redirect('/')
})

//Update member
router.put('/:id', (req, res) => {
  const id = req.url.split('/')[3]
  const member = members.find(m => m._id == req.params.id)
  if (!member) res.status(400).send(`Member with given id ${id} not found`)
  const updMember = req.body;
  members.forEach(member => {
    if (member._id == req.params.id) {
      member.name = updMember.name ? updMember.name : member.name;
      member.email = updMember.email ? updMember.email : member.email;
      res.send(updMember)
    }
  })

})


router.delete('/:id', (req, res) => {
  const id = req.url.split('/')[3]
  const member = members.find(m => m._id == req.params.id)
  if (!member) return res.status(400).send(`Member with given id ${id} not found`)

  const remainingMembers = members.filter(mem => mem._id != req.params.id)
  res.send({
    msg: "member deleted",
    members: remainingMembers
  })
})


module.exports = router