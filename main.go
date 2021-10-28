package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

// User struct which contains a name
// a type and a list of social links
type User struct {
	Player1 string `json:"player1"`
	Player2 string `json:"player2"`
}

func getPlayers() (User, error) {
	var users User

	// Open our jsonFile
	jsonFile, err := os.Open("secret.json")
	if err != nil {
		return users, err
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	json.Unmarshal(byteValue, &users)

	return users, nil
}

func main() {
	users, err := getPlayers()
	if err != nil {
		return
	}

	fmt.Println(users)
}
