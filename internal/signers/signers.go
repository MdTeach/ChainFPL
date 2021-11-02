package signers

import (
	"fmt"
	"log"

	"github.com/ethereum/go-ethereum/crypto"
)

type Signers struct {
	Player1 string `json:"player1"`
	Player2 string `json:"player2"`
}

type Player struct {
	SecKey string
	PubKey string
}

func (p *Player) GetPlayer(Player, error) {
	privateKey, err := crypto.GenerateKey()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(privateKey)

}
