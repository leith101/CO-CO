import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../../Models/ChatMessage';
import { ChatService } from '../../service/chat.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {


 
  messageInput: string = '';
  userId: string="";
  messageList: any[] = [];
  userList:any[]=[];
  selectedUserId: string = '';
  selectedUserName: string = '';
  selectedImage: File | null = null;

  messages: ChatMessage[] = [];

  constructor(private chatService: ChatService,
    private route: ActivatedRoute,  
    ){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.userId = params['userId']; // Récupérer l'ID de l'utilisateur à partir des paramètres de l'URL
        this.chatService.joinRoom(this.userId);
        this.lisenerMessage();
        this.getConnectedUsers();
    });

   
   
  }

  sendFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.chatService.sendFileMessage(file, this.messageInput, this.selectedUserId);
      this.messageInput = '';
    }
  }

  sendMessage() {
    if (this.selectedUserId) {
        const chatMessage = {
            message: this.messageInput, // Assign message content
            user: this.userId,
            file: this.selectedImage
        } as ChatMessage;

        if (this.selectedImage) {
            console.log('Sending message with attachment:', chatMessage);
            try {
                this.chatService.sendMessage(this.selectedUserId, chatMessage);
                console.log('image sent successfully');

            } catch (error) {
                console.error('Error sending message:', error);
            }
        } else {
            console.log('Sending message without attachment:', chatMessage);
            this.sendMessageWithoutAttachment(chatMessage);
        }

        this.messageInput = ''; // Clear message input
    } else {
        console.error('No user selected to send the message.');
    }
}



sendMessageWithoutAttachment(chatMessage: ChatMessage) {
  this.chatService.sendMessage(this.selectedUserId, chatMessage);
  console.log('Sending without attachment');
  // Update the message list after sending the message
  this.messageList.push({ ...chatMessage, message_side: 'sender' });
  if (this.messageList.length > 100) {
      this.messageList.shift();
  }
}


logItem(item: any) {
  console.log(item);
}


lisenerMessage() {
  this.chatService.getMessageSubject().subscribe((messages: any) => {
    // Merge received messages with existing message list
    this.messageList = this.messageList.concat(
      messages.map((item: any) => {
        const message = {
          ...item,
          message_side: item.user === this.userId ? 'sender' : 'receiver'
        };


        return message;
      })
    );
  });
}

onFileSelected(event: any) {
  this.selectedImage = event.target.files[0];
  console.log('Selected File:', this.selectedImage);

}



  getConnectedUsers(): void {
    this.chatService.getConnectedUsers().subscribe(
      (users) => {
        this.userList = users; // Assurez-vous que la réponse de l'API est un tableau d'utilisateurs
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des utilisateurs connectés :', error);
      }
    );
  }

  selectUser(user: any) {
    this.selectedUserId = user.id;
    this.updateTopMenuTitle(user.nom); // Stockez l'ID de l'utilisateur sélectionné
}


  filterTable() {
    const filter = (document.getElementById('searchInput') as HTMLInputElement).value.toUpperCase();
    const users = document.querySelectorAll('.list-unstyled.chat-list li');
    users.forEach(user => {
      const name = (user.querySelector('.name') as HTMLElement).innerText.toUpperCase();
      if (name.indexOf(filter) > -1) {
        (user as HTMLElement).style.display = ''; // Convertir l'élément en HTMLElement
      } else {
        (user as HTMLElement).style.display = 'none'; // Convertir l'élément en HTMLElement
      }
    });
}

updateTopMenuTitle(userName: string) {
  this.selectedUserName = userName;
}


updateUserPresence(userId: string, isOnline: boolean) {
  const userIndex = this.userList.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    this.userList[userIndex].isOnline = isOnline;
  }
}

handleImageUpload(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedImage = file;
  }
}






}
