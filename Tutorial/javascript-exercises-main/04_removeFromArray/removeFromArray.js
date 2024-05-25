const removeFromArray = function(arraySplice, ...args) // ...args is a array means thbat
{
    let newArray = [];

    for (let i = 0; i < arraySplice.length; i++)
    {
        if (!args.includes(arraySplice[i])) 
        {
            newArray.push(arraySplice[i]);
        }
    }
    return newArray;
};

// Do not edit below this line
module.exports = removeFromArray;
