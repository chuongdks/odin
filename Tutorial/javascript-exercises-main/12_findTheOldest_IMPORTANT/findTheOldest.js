const findTheOldest = function(people) 
{
    return people.reduce((oldest, person) => 
    {
        if (person.yearOfDeath === undefined )
        {
            person.yearOfDeath = new Date().getFullYear();
        }
        const currentAge = person.yearOfDeath - person.yearOfBirth;
        const oldestAge = oldest.yearOfDeath - oldest.yearOfBirth;

        // 
        console.log(oldestAge);

        return currentAge > oldestAge ? person : oldest;
    }, people[0]);
};

/*
    The accumulator oldest is initialized with the first person in the array.
    For each person, it calculates their age.
    It compares the current person's age with the oldest person's age found so far.
    If the current person is older, it updates the oldest accumulator to the current person.
    Finally, it returns the oldest person after all iterations.
*/ 
// Do not edit below this line
module.exports = findTheOldest;
