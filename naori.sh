#!/bin/bash
while true; do
    echo "—————► N A O R I B O T ◄—————"
    echo "> MENU <"
    echo "1. Install Naori Bot Dependencies"
    echo "2. Normal Start Naori Bot"
    echo "3. Start Naori Bot With Pairing Code "
    echo "4. Clear Session"
    echo "5. Unistall Naori Bot Dependencies"
    echo "6. Exit"
    read -p "Chose Option : " choice

    case $choice in
        1)
            echo ""
            echo ""
            echo "INSTALLING NAORI BOT » » »"
            yarn install
            echo "Done."
            echo ""
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
            echo ""
            echo "—————► N A O R I B O T ◄—————"
            yarn run normalStart
            echo ""
            echo ""
            exit 0
            ;;
        3) 
            clear
            echo "—————► N A O R I B O T ◄—————"
            echo ""
            echo ""
            echo "STARTING BOT » » »"
            echo ""
            echo "—————► N A O R I B O T ◄—————"
            yarn run pairingCode
            echo ""
            echo ""
            exit 0
            ;;
        4)
            echo ""
            echo ""
            echo "CLEANING UP SESSION » » »"
            rm -r session
            mkdir session
            echo "Done."
            echo ""
            echo "—————► N A O R I B O T ◄—————"
            echo ""
            echo ""
            ;;
        5)
            echo ""
            echo ""
            echo "UNISTALLING NAORI BOT » » »"
            rm -r node_modules
            echo "Done."
            echo ""
            echo "—————► N A O R I B O T ◄—————"
            echo ""
            echo ""
            ;;
        6)
            echo ""
            echo ""
            echo "EXIT » » »"
            echo ""
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