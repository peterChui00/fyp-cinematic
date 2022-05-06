package fyp.kwchui.cinematicbackend.service;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import fyp.kwchui.cinematicbackend.model.Cinema;
import fyp.kwchui.cinematicbackend.model.House;
import fyp.kwchui.cinematicbackend.model.MovieShowing;
import fyp.kwchui.cinematicbackend.model.Order;
import fyp.kwchui.cinematicbackend.model.Seat;
import fyp.kwchui.cinematicbackend.model.Ticket;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    String from;

    public void sendOrderConfirmationEmail(Order order, String toEmail) {
        String messageText = "<html><head><style>table, th, td {border: 0px; padding-left: 20px; padding-right: 20px; padding-bottom: 20px;} .ticket{padding-top: 20px}</style></head><body><h2 style='text-align:center'>CINEMATIC</h2><p>Dear %s,</p><br/>";
        messageText += "<p>Thank you for booking tickets through CINEMATIC, the following is the order detail:</p><br/>";
        messageText += "Order ID: %s<br/>";
        messageText += "Order time: %s<br/>";
        messageText += "Payment Method: %s<br/><hr/>";
        messageText = String.format(messageText,
                order.getUser().getUsername(), order.getId(), order.getOrderTime(),
                order.getPaymentMethod());

        MovieShowing movieShowing = order.getTickets().get(0).getSeat().getMovieShowing();
        House house = movieShowing.getHouse();
        Cinema cinema = house.getCinema();

        messageText += "<table style='text-align:center'>";
        messageText += "<tr><th>Movie</th><th colspan='4'>%s</th></tr>";
        messageText += "<tr><th>Cinema</th><th colspan='4'>%s</th></tr>";
        messageText += "<tr><th>House </th><th colspan='4'>%s</th></tr>";
        messageText = String.format(messageText, movieShowing.getMovie().getTitle(), cinema.getName(), house.getName());

        messageText += "<tr><th class='ticket'>QR Code</th><th class='ticket'>Seat</th><th class='ticket'>Type</th><th class='ticket'>Price (HKD$)</th></tr>";
        for (Ticket ticket : order.getTickets()) {
            Seat seat = ticket.getSeat();
            messageText += "<tr>";
            messageText += "<td><img src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&format=png&data=%s' width='80px'></td>";
            messageText += "<td>%s</td><td>%s</td><td>%s</td>";
            messageText += "</tr>";

            char[] alphabetArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
            String seatString = house.getRowStyle().equals("alphabet")
                    ? String.valueOf(alphabetArray[ticket.getSeat().getRow()])
                    : String.valueOf(seat.getRow() + 1);
            seatString += " - " + String.valueOf(seat.getColumn() + 1);
            messageText = String.format(messageText, seat.getId(), seatString, ticket.getType(), ticket.getPrice());
        }
        messageText += "</table>";
        messageText += "</body></html>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(toEmail);
            helper.setSubject("CINEMATIC - Order Confirmation #" + order.getId());
            helper.setText(messageText, true);
            mailSender.send(message);
        } catch (Exception e) {
            log.error("Failed to send order confirmation email.");
        }

    }
}
