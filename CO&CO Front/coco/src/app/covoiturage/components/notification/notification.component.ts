import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import { ServiceService } from '../../../login/services/service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = []; // Use generic type for notifications

  constructor(
    private annonceService: AnnonceService,
    private userService: ServiceService
  ) {}

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe(
      (user: any) => {
        const userId = user.id; 
        if (userId) {
          this.getNotifications(userId);
        } else {
          console.error('User ID is undefined.');
        }
      },
      (error) => {
        console.error('Error fetching logged-in user:', error);
      }
    );
  }

  getNotifications(userId: number): void {
    this.annonceService.getUserNotifications(userId).subscribe(
      (notifications) => {
        this.notifications = notifications; 
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  markAsRead(notificationId: number): void {
    this.annonceService.markAsRead(notificationId).subscribe(
      () => {
        // Mark notification as read
        this.notifications = this.notifications.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        );
      },
      (error) => {
        console.error('Error marking notification as read:', error);
      }
    );
  }
}
