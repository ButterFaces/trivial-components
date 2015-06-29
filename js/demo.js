var firstNames = ['Mary', 'Patricia', 'Linda', 'Barbara', 'Elizabeth', 'Jennifer', 'Maria', 'Susan', 'Margaret', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Sarah', 'Kimberly', 'Deborah', 'Jessica', 'Shirley', 'Cynthia', 'Angela', 'Melissa', 'Brenda', 'Amy', 'Anna', 'Rebecca', 'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Charles', 'Joseph', 'Thomas', 'Christopher', 'Daniel', 'Paul', 'Mark', 'Donald', 'George', 'Kenneth', 'Steven', 'Edward', 'Brian', 'Ronald', 'Anthony', 'Kevin', 'Jason', 'Matthew', 'Gary', 'Timothy', 'Jose', 'Larry', 'Jeffrey', 'Frank', 'Scott', 'Eric', 'Stephen', 'Andrew', 'Raymond', 'Gregory'];
var lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris'];
var words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consetetur', 'sadipscing', 'elitr', 'sed', 'diam', 'nonumy', 'eirmod', 'tempor', 'invidunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliquyam', 'erat', 'sed', 'diam', 'voluptua', 'at', 'vero', 'eos', 'et', 'accusam', 'et', 'justo', 'duo', 'dolores', 'et', 'ea', 'rebum', 'stet', 'clita', 'kasd', 'gubergren', 'no', 'sea', 'takimata', 'sanctus', 'est', 'lorem', 'ipsum', 'dolor', 'sit', 'amet'];
var colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#f39c12', '#d35400', '#c0392b'];
var countryExtensions = ["ad", "af", "ai", "al", "am", "ao", "aq", "ar", "as", "at", "au", "aw", "az", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cg", "ch", "ck", "cl", "cm", "cn", "co", "co", "cr", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "dz", "ec", "ed", "ee", "eg", "eh", "er", "es"];

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomOf(array) {
    return array[randomInt(array.length)]
}

function randomWords(count) {
    var sentence = "";
    for (var i = 0; i < count; i++) {
        sentence += words[randomInt(words.length)];
        if (i < count - 1) {
            sentence += " ";
        }
    }
    return sentence;
}
function randomImageUrl() {
    return "https://avatars1.githubusercontent.com/u/" + (10000 + randomInt(1000)) + "?v=3&s=30";
}

function randomColor() {
    return colors[randomInt(colors.length)];
}

function randomEmail() {
    return randomOf(firstNames)
}


function createEntries(count) {
    count = count || 100;

    var entries = [];
    for (var i = 0; i < count; i++) {
        var firstName = randomOf(firstNames);
        var lastName = randomOf(lastNames);
        entries.push({
            id: i,
            displayValue: firstName +  ' ' + lastName,
            additionalInfo: firstName.toLowerCase() + '.' + lastName.toLowerCase() +'@' + randomOf(words) + '.' + randomOf(countryExtensions),
            imageUrl: randomImageUrl(),
            statusColor: randomColor()
        });
    }
    return entries;
}