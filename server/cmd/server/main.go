package main

import (
	"fmt"
	"log"
)

type App struct {
	Version string
}

func (app *App) Run() error {
	fmt.Println("Running...")
	return nil
}

func main() {

	app := App{Version: "1.0"}

	if err := app.Run(); err != nil {
		log.Fatal("Error starting the app", err)
	}
}
