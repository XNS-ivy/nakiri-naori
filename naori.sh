#!/bin/bash

while true; do
    echo "—————► N A O R I B O T ◄—————"
    echo "> MENU <"
    echo "1. Install Naori Bot Dependencies"
    echo "2. Start Naori Bot"
    echo "3. Clear Session"
    echo "4. Unistall Naori Bot Dependencies"
    echo "5. Exit"
    read -p "Chose Option : " choice

    case $choice in
        1)
            echo ""
            echo ""
            echo "INSTALLING NAORI BOT » » »"
            npm install
            echo "Done."
            echo "—————► N A O R I B O T ◄—————"
            echo ""
            echo ""
            ;;
        2)
            clear
            echo "—————► N A O R I B O T ◄—————"
            echo ""
            echo ""
            echo "STARTING BOT » » »"
            npm start
            echo "Done."
            echo "—————► N A O R I B O T ◄—————"
            echo ""
            echo ""
            exit 0
            ;;
        3)
            echo ""
            echo ""
            echo "CLEANING UP SESSION » » »"
            rm -r session
            mkdir session
            echo "Done."
            echo "—————► N A O R I B O T ◄—————"
            echo ""
            echo ""
            ;;
        4)
            echo ""
            echo ""
            echo "UNISTALLING NAORI BOT » » »"
            rm -r node_modules
            echo "Done."
            echo "—————► N A O R I B O T ◄—————"
            echo ""
            echo ""
            ;;
        5)
            echo ""
            echo ""
            echo "EXIT » » »"
            echo "—————► N A O R I B O T ◄—————"
            echo ""
            echo ""
            exit 0
            clear
            ;;
        *)
            echo ""
            echo ""
            echo "PLEASE CHOSE VALID OPTION!"
            echo "—————► N A O R I B O T ◄—————"
            echo ""
            echo ""
            ;;
    esac
done