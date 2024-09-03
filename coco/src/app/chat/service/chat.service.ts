import { Injectable } from '@angular/core';
import { ServiceService } from '../../login/services/service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../Models/ChatMessage';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8089';


  private stompClient: any
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor(private http:HttpClient) { 
    this.initConnenctionSocket();
  }

  initConnenctionSocket() {
    const url = '//localhost:8089/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket)
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, ()=>{
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);

        this.messageSubject.next(currentMessage);

      })
    })
  }

  sendMessage(roomId: string, chatMessage: ChatMessage) {
    if (chatMessage.file) {
        // If a file is attached, read its content before sending
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Content = (event.target as FileReader).result as string; // Get base64 content directly
            chatMessage.fileContent = base64Content;
            this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
        };
        reader.readAsDataURL(chatMessage.file); // Read as data URL
    } else {
        // If no file is attached, send the message directly
        this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
    }
}


sendFileMessage(file: File, message?: string, roomId?: string): void {
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);
  formData.append('message', JSON.stringify(message));
  this.http.post(`/api/chat/${roomId}`, formData).subscribe(
    () => {
      console.log('File message sent successfully');
    },
    (error) => {
      console.error('Error sending file message:', error);
    }
  );
}





  getMessageSubject(){
    return this.messageSubject.asObservable();
  }

  getConnectedUsers(): Observable<any> {
    // Assuming the endpoint for connected users is /listUsers
    const url = `${this.baseUrl}/listUsers`;
    return this.http.get<any>(url);
  }


  
 
}
