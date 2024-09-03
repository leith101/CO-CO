import { ChatbotService } from './../../service/chatbot.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  userInput: string = '';
  messages: { content: string, from: string }[] = [];
  
  constructor(private ChatbotService: ChatbotService) {}

  sendMessage() {
    if (this.userInput.trim() === '') {
      return; // Ne pas envoyer de message vide
    }
    
    // Ajoute le message de l'utilisateur aux messages
    this.messages.push({ content: this.userInput, from: 'user' });
    this.userInput = ''; // Efface l'entrée de l'utilisateur

    // Envoie le message à Dialogflow
    this.ChatbotService.sendMessage(this.messages[this.messages.length - 1].content)
      .subscribe((response: any) => {
        // Ajoute la réponse de Dialogflow aux messages
        this.messages.push({ content: response.queryResult.fulfillmentText, from: 'bot' });
      }, (error: any) => {
        console.error('Erreur lors de la communication avec Dialogflow :', error);
        this.messages.push({ content: 'Désolé, une erreur s\'est produite.', from: 'bot' });
      });
  }
}


