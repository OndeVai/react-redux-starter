import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const rodeoSearchResults = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/rodeos/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript",
    timestamp: new Date().toTimeString()
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/rodeos/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices",
    timestamp: new Date().toTimeString()
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/rodeos/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture",
    timestamp: new Date().toTimeString()
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/rodeos/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career",
    timestamp: new Date().toTimeString()
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/rodeos/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5",
    timestamp: new Date().toTimeString()
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (rodeo) => {
  return replaceAll(rodeo.title, ' ', '-');
};

class RodeoApi {
  static getAllRodeos() {
    return new Promise((resolve, reject) => {
      //test error
      /**
       reject({
        status: 500,
        message: `server error!`
      });
       **/
        //return;

      const newRodeos = Object.assign([], rodeoSearchResults).map(rodeo => {
          return {
            id: rodeo.id,
            authorId: rodeo.authorId,
            category: rodeo.category,
            title: rodeo.title,
            length: rodeo.length,
            timestamp: new Date().toTimeString()
          };
        });
      setTimeout(() => {
        resolve(newRodeos);
      }, delay);
    });
  }

  static getRodeo(rodeoId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rodeosFiltered = rodeoSearchResults.filter(rodeo => rodeo.id === rodeoId);
        const rodeo = rodeosFiltered.length ? rodeosFiltered[0] : null;

        if (!rodeo) {
          const error404 = {status: 404, message: 'Rodeo was not found!'};
          reject(error404);
          return;
        }

        resolve(Object.assign({}, rodeo));
      }, delay);
    });
  }

  static saveRodeo(rodeo) {
    rodeo = Object.assign({}, rodeo); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {


        // Simulate server-side validation
        if (rodeo.title === 'error') {
          reject({
            status: 400,
            message: `server user error test`
          });
          return;
        }

        if (rodeo.id) {
          const existingRodeoIndex = rodeoSearchResults.findIndex(a => a.id == rodeo.id);
          rodeoSearchResults.splice(existingRodeoIndex, 1, rodeo);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new rodeos in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          rodeo.id = generateId(rodeo);
          rodeo.watchHref = `http://www.pluralsight.com/rodeos/${rodeo.id}`;
          rodeoSearchResults.push(rodeo);
        }

        resolve(rodeo);
      }, delay);
    });
  }

  static deleteRodeo(rodeoId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfRodeoToDelete = rodeoSearchResults.findIndex(rodeo => {
          rodeo.id == rodeoId;
        });
        rodeoSearchResults.splice(indexOfRodeoToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default RodeoApi;
