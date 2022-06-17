package com.edyu.courreurdejupons;

import com.edyu.courreurdejupons.utils.ApplicationUtils;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.beans.binding.Binding;
import javafx.beans.binding.Bindings;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.SceneAntialiasing;
import javafx.scene.control.Button;
import javafx.scene.control.ContentDisplay;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.image.ImageView;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;

import javax.xml.namespace.QName;
import java.io.IOException;
import java.util.Locale;

public class MainApp extends Application /**/implements EventHandler<ActionEvent> {

    private int totalGirlfriendCount = 0;
    private Label titleLabel;
    private Label statusLabel;
    private Button removeGirlfriendButton;

    @Override
    public void start(Stage primaryStage) throws IOException {
        primaryStage.setTitle("Coureur de Jupons");

        // La scène a pour classe root de l'élément racine :
        VBox root = new VBox();
        //root.setPrefWidth(175);

        this.titleLabel = new Label("Coureur de Jupons");
        this.titleLabel.setId("titleLabel");
        //this.titleLabel.setFont(Font.font("Pacifico", FontWeight.BOLD, 28));
        //this.titleLabel.setTextFill(Color.web("#044E54"));
        //this.titleLabel.setPadding(new Insets(0, 0, 40, 0));

        this.statusLabel = new Label();
        this.statusLabel.setId("statusLabel");
        // Méthode CSS :
        //this.statusLabel.setStyle("-fx-font-family: \"Avenir Next\"; -fx-font-size: 14px; -fx-text-fill: #044E54");
        updateStatusLabel();

        ImageView coeur = new ImageView(String.valueOf(getClass().getResource("/images/coeur.png")));
        ImageView coeurHover = new ImageView(String.valueOf(getClass().getResource("/images/coeur_hover.png")));
        ImageView dislike = new ImageView(String.valueOf(getClass().getResource("/images/dislike.png")));
        ImageView dislikeHover = new ImageView(String.valueOf(getClass().getResource("/images/dislike_hover.png")));

        HBox buttonsContainer = new HBox(10);
        // Pour donner une classe en CSS :
        //buttonsContainer.getStyleClass().add("HBox");
        buttonsContainer.setAlignment(Pos.CENTER);
        
        Button addGirlfriendButton = new Button("J'ai une nouvelle copine".toUpperCase());
        //addGirlfriendButton.setMinWidth(root.getPrefWidth());
        // Méthode observable :
        addGirlfriendButton.graphicProperty().bind(Bindings.when(addGirlfriendButton.hoverProperty()).then(coeurHover).otherwise(coeur));
        addGirlfriendButton.setContentDisplay(ContentDisplay.TOP);
        // Méthode Lambda expression :
        addGirlfriendButton.setOnAction(e /* ou (e)*/  -> {
            this.totalGirlfriendCount++;
            updateStatusLabel();
        });

        this.removeGirlfriendButton = new Button("J'ai perdu une copine".toUpperCase());
        //this.removeGirlfriendButton.setFont(Font.font("Avenir Next",  14));
        //this.removeGirlfriendButton.setBackground(new Background(new BackgroundFill(Color.web("#E66A6A"), null, null)));
        //this.removeGirlfriendButton.setTextFill(Color.WHITE);
        //this.removeGirlfriendButton.setPadding(new Insets(8));
        //this.removeGirlfriendButton.setMaxWidth(Double.MAX_VALUE);
        //this.removeGirlfriendButton.setMinWidth(root.getPrefWidth());
        this.removeGirlfriendButton.setGraphic(dislike);
        this.removeGirlfriendButton.setContentDisplay(ContentDisplay.TOP);
        this.removeGirlfriendButton.setOnMouseEntered(e -> this.removeGirlfriendButton.setGraphic(dislikeHover));
        this.removeGirlfriendButton.setOnMouseExited(e -> this.removeGirlfriendButton.setGraphic(dislike));
        // Remarque : On peut également le faire en créant un Id puis en passant par CSS :
        // Méthode référence :
        this.removeGirlfriendButton.setOnAction(this);
        // ou faire (sans implements EventHandler<ActionEvent> dans MainApp
        // mais en créant : private class ButtonHadler implements EventHandler<ActionEvent>
        // voir plus bas)
        //this.removeGirlfriendButton.setOnAction(new ButtonHadler());

        buttonsContainer.getChildren().addAll(addGirlfriendButton, this.removeGirlfriendButton);

        root.getChildren().addAll(this.titleLabel, this.statusLabel, buttonsContainer);

        Scene scene = new Scene(root);
        scene.getStylesheets().add(String.valueOf(getClass().getResource("/css/MainApp.css")));
        //scene.getStylesheets().add("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

        primaryStage.setScene(scene);
        primaryStage.setResizable(false);
        primaryStage.show();

        Parent root1 = FXMLLoader.load(getClass().getResource("/fxml/MainApp.fxml"));
        Stage secondStage = new Stage();
        Scene scene1= new Scene(root1);
        secondStage.setTitle("Hello World!");
        secondStage.setResizable(false);
        secondStage.setScene(scene1);
        secondStage.show();
        secondStage.centerOnScreen();
    }

    private void updateStatusLabel() {
        this.statusLabel.setText("Tu as actuellement " + ApplicationUtils.pluralize(totalGirlfriendCount, "copine") + ".");
    }

    @Override
    public void handle(ActionEvent e) {
        if(e.getSource() ==  removeGirlfriendButton) {
            if (totalGirlfriendCount > 0) {
                totalGirlfriendCount--;
                updateStatusLabel();
            }
        } //else{...}
    }

   /*
   private class ButtonHadler implements EventHandler<ActionEvent> {
        @Override
        public void handle(ActionEvent e) {
            if(e.getSource() ==  removeGirlfriendButton) {
                if (totalGirlfriendCount > 0) {
                    totalGirlfriendCount--;
                    updateStatusLabel();
                }
            } //else{...}
        }
    }
    */

    public static void main(String[] args) {
        launch(args);
    }
}