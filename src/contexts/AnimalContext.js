import React from 'react';

const Context = React.createContext();

const marginRight = 95;

export class AnimalStore extends React.Component {

  state = {
    bets: [],
    idToIndex: {
      "00": 0, "01": 0, "02": 0, "03": 0,
      "04": 1, "05": 1, "06": 1, "07": 1,
      "08": 2, "09": 2, "10": 2, "11": 2,
      "12": 3, "13": 3, "14": 3, "15": 3,
      "16": 4, "17": 4, "18": 4, "19": 4,
      "20": 5, "21": 5, "22": 5, "23": 5,
      "24": 6, "25": 6, "26": 6, "27": 6,
      "28": 7, "29": 7, "30": 7, "31": 7,
      "32": 8, "33": 8, "34": 8, "35": 8,
      "36": 9, "37": 9, "38": 9, "39": 9,
      "40": 10, "41": 10, "42": 10, "43": 10,
      "44": 11, "45": 11, "46": 11, "47": 11,
      "48": 12, "49": 12, "50": 12, "51": 12,
      "52": 13, "53": 13, "54": 13, "55": 13,
      "56": 14, "57": 14, "58": 14, "59": 14,
      "60": 15, "61": 15, "62": 15, "63": 15,
      "64": 16, "65": 16, "66": 16, "67": 16,
      "68": 17, "69": 17, "70": 17, "71": 17,
      "72": 18, "73": 18, "74": 18, "75": 18,
      "76": 19, "77": 19, "78": 19, "79": 19,
      "80": 20, "81": 20, "82": 20, "83": 20,
      "84": 21, "85": 21, "86": 21, "87": 21,
      "88": 22, "89": 22, "90": 22, "91": 22,
      "92": 23, "93": 23, "94": 23, "95": 23,
      "96": 24, "97": 24, "98": 24, "99": 24
    },
    animals: [
      {
        name: "Bear",
        imageDark: require("../assets/images/bear_black.png"),
        image: require("../assets/images/bear.png"),
        top: -50,
        left: 10,
        selected: false,
        id: ["00", "01", "02", "03"],
        index: 0
      },
      {
        name: "Bird",
        imageDark: require("../assets/images/bird_black.png"),
        image: require("../assets/images/bird.png"),
        top: -50,
        left: 10 + marginRight,
        selected: false,
        id: ["04", "05", "06", "07"],
        index: 1
      },
      {
        name: "Bull",
        imageDark: require("../assets/images/bull_black.png"),
        image: require("../assets/images/bull.png"),
        top: -50,
        left: 10 + marginRight * 2,
        selected: false,
        id: ["08", "09", "10", "11"],
        index: 2
      },
      {
        name: "Cat",
        imageDark: require("../assets/images/cat_black.png"),
        image: require("../assets/images/cat.png"),
        top: -50,
        left: 10 + marginRight * 3,
        selected: false,
        id: ["12", "13", "14", "15"],
        index: 3
      },
      {
        name: "Chicken",
        imageDark: require("../assets/images/chicken_black.png"),
        image: require("../assets/images/chicken.png"),
        top: -50,
        left: 10 + marginRight * 4,
        selected: false,
        id: ["16", "17", "18", "19"],
        index: 4
      },
      {
        name: "Crocodile",
        imageDark: require("../assets/images/crocodile_black.png"),
        image: require("../assets/images/crocodile.png"),
        top: 30,
        left: 10,
        selected: false,
        id: ["20", "21", "22", "23"],
        index: 5
      },
      {
        name: "Duck",
        imageDark: require("../assets/images/duck_black.png"),
        image: require("../assets/images/duck.png"),
        top: 25,
        left: 10 + marginRight,
        selected: false,
        id: ["24", "25", "26", "27"],
        index: 6
      },
      {
        name: "Fox",
        imageDark: require("../assets/images/fox_black.png"),
        image: require("../assets/images/fox.png"),
        top: 25,
        left: 10 + marginRight * 2,
        selected: false,
        id: ["28", "29", "30", "31"],
        index: 7
      },
      {
        name: "Frog",
        imageDark: require("../assets/images/frog_black.png"),
        image: require("../assets/images/frog.png"),
        top: 25,
        left: 10 + marginRight * 3,
        selected: false,
        id: ["32", "33", "34", "35"],
        index: 8
      },
      {
        name: "Gnu",
        imageDark: require("../assets/images/gnu_black.png"),
        image: require("../assets/images/gnu.png"),
        top: 25,
        left: 10 + marginRight * 4,
        selected: false,
        id: ["36", "37", "38", "39"],
        index: 9
      },
      {
        name: "Snake",
        imageDark: require("../assets/images/greensnake_black.png"),
        image: require("../assets/images/greensnake.png"),
        top: 100,
        left: 10,
        selected: false,
        id: ["40", "41", "42", "43"],
        index: 10
      },
      {
        name: "Parrott",
        imageDark: require("../assets/images/parrot_black.png"),
        image: require("../assets/images/parrot.png"),
        top: 100,
        left: 10 + marginRight,
        selected: false,
        id: ["44", "45", "46", "47"],
        index: 11
      },
      {
        name: "Hippopotamus",
        imageDark: require("../assets/images/hippopotamus_black.png"),
        image: require("../assets/images/hippopotamus.png"),
        top: 105,
        left: 10 + marginRight * 2,
        selected: false,
        id: ["48", "49", "50", "51"],
        index: 12
      },
      {
        name: "Kangaroo",
        imageDark: require("../assets/images/kangaroo_black.png"),
        image: require("../assets/images/kangaroo.png"),
        top: 105,
        left: 10 + marginRight * 3,
        selected: false,
        id: ["52", "53", "54", "55"],
        index: 13
      },
      {
        name: "Koala",
        imageDark: require("../assets/images/koala_black.png"),
        image: require("../assets/images/koala.png"),
        top: 105,
        left: 10 + marginRight * 4,
        selected: false,
        id: ["56", "57", "58", "59"],
        index: 14
      },
      {
        name: "Lion",
        imageDark: require("../assets/images/lion_black.png"),
        image: require("../assets/images/lion.png"),
        top: 180,
        left: 10,
        selected: false,
        id: ["60", "61", "62", "63"],
        index: 15
      },
      {
        name: "Mouse",
        imageDark: require("../assets/images/mouse_black.png"),
        image: require("../assets/images/mouse.png"),
        top: 180,
        left: 10 + marginRight,
        selected: false,
        id: ["64", "65", "66", "67"],
        index: 16
      },
      {
        name: "Owl",
        imageDark: require("../assets/images/owl_black.png"),
        image: require("../assets/images/owl.png"),
        top: 180,
        left: 10 + marginRight * 2,
        selected: false,
        id: ["68", "69", "70", "71"],
        index: 17
      },
      {
        name: "Cheetah",
        imageDark: require("../assets/images/cheetah_black.png"),
        image: require("../assets/images/cheetah.png"),
        top: 180,
        left: 10 + marginRight * 3,
        selected: false,
        id: ["72", "73", "74", "75"],
        index: 18
      },
      {
        name: "Pelican",
        imageDark: require("../assets/images/pelican_black.png"),
        image: require("../assets/images/pelican.png"),
        top: 180,
        left: 10 + marginRight * 4,
        selected: false,
        id: ["76", "77", "78", "79"],
        index: 19
      },
      {
        name: "Pigeon",
        imageDark: require("../assets/images/pigeon_black.png"),
        image: require("../assets/images/pigeon.png"),
        top: 258,
        left: 10,
        selected: false,
        id: ["80", "81", "82", "83"],
        index: 20
      },
      {
        name: "Rhino",
        imageDark: require("../assets/images/rhino_black.png"),
        image: require("../assets/images/rhino.png"),
        top: 258,
        left: 10 + marginRight,
        selected: false,
        id: ["84", "85", "86", "87"],
        index: 21
      },
      {
        name: "Panda",
        imageDark: require("../assets/images/panda_black.png"),
        image: require("../assets/images/panda.png"),
        top: 258,
        left: 10 + marginRight * 2,
        selected: false,
        id: ["88", "89", "90", "91"],
        index: 22
      },
      {
        name: "Dog",
        imageDark: require("../assets/images/dog_black.png"),
        image: require("../assets/images/dog.png"),
        top: 256,
        left: 10 + marginRight * 3,
        selected: false,
        id: ["92", "93", "94", "95"],
        index: 23
      },
      {
        name: "Worm",
        imageDark: require("../assets/images/worm_black.png"),
        image: require("../assets/images/worm.png"),
        top: 265,
        left: 10 + marginRight * 4,
        selected: false,
        id: ["96", "97", "98", "99"],
        index: 24
      }
    ]
  }

  clearBetsUrls = async () => {
    this.state.bets.map((bet, i) => {
      this.toggleSelection(this.state.idToIndex[bet[0]]);
    })
    await this.setState({ bets: [] });
  }

  twoDigToAnimalUrl = (dig) => {
    const modDraw = dig.slice(-2);
    const index = this.state.idToIndex[modDraw];
    return this.state.animals[index].image;
  }

  toggleSelection = async (index) => {
    const animalCopy = this.state.animals.slice();
    const currentStatus = animalCopy[index]["selected"];
    if (!currentStatus) {
      if (this.state.bets.length >= 5) {
        alert("You cannot select more than 5 animals. Click animal again to unselect")
      } else {
        animalCopy[index]["selected"] = true;
        const bets = this.state.bets.slice()
        bets.push(animalCopy[index]["id"])
        await this.setState({ animals: animalCopy, bets: bets });
      }
    } else {
      animalCopy[index]["selected"] = false;
      const bets = this.state.bets.slice();
      const indexBet = bets.indexOf(animalCopy[index]["id"]);
      bets.splice(indexBet, 1);
      await this.setState({ animals: animalCopy, bets: bets });
    }
    console.log(this.state.bets);
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          toggleSelection: this.toggleSelection,
          twoDigToAnimalUrl: this.twoDigToAnimalUrl,
          clearBetsUrls: this.clearBetsUrls
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

}

export default Context;
