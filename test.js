const arr = [
    {
        id:1,
        name:"test"
    },
    {
        id:2,
        name:"demo"
    },
    {
        id:3,
        name:"admin"
    },

]

// const op = arr.map(item => item.id )
const op = arr.filter(item => item.id > 1).map(item => item.name)

console.log(op);
