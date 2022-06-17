package com.edyu.courreurdejupons;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.beans.binding.Bindings;
import javafx.beans.binding.IntegerBinding;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.util.concurrent.Callable;

public class Demo extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception{
        VBox root = new VBox(10);
        root.setPadding(new Insets(25));
        root.setAlignment(Pos.CENTER);

        Label sumLabel = new Label("15");
        TextField textField1 = new TextField("5");
        TextField textField2 = new TextField("10");

        root.getChildren().addAll(sumLabel, textField1, textField2);

        // permet que la valeur affichée du label soit égale à la somme de textField1 et de textField2
        // Méthode 1 :
        /*
        IntegerBinding integerBinding = new IntegerBinding() {
            // un initializer
            {
                bind(textField1.textProperty(), textField2.textProperty());
            }
            @Override
            protected int computeValue() {
                //Si le textField est vide alors on le remplace par un 0
                int value1 = textField1.getText().trim().isEmpty() ? 0 : Integer.parseInt(textField1.getText());
                int value2 = textField2.getText().trim().isEmpty() ? 0 : Integer.parseInt(textField2.getText());
                return value1 + value2;
            }
        };
        */

        // Méthode 2 :
        IntegerBinding integerBinding = Bindings.createIntegerBinding(new Callable<Integer>() {
            @Override
            public Integer call() throws Exception {
                int value1 = textField1.getText().trim().isEmpty() ? 0 : Integer.parseInt(textField1.getText());
                int value2 = textField2.getText().trim().isEmpty() ? 0 : Integer.parseInt(textField2.getText());
                return value1 + value2;
            }
        }, textField1.textProperty(), textField2.textProperty());

        sumLabel.textProperty().bind(integerBinding.asString());

        Scene scene= new Scene(root, 400 , 400);
        primaryStage.setTitle("Demo");
        primaryStage.setResizable(false);
        primaryStage.setScene(scene);
        primaryStage.show();
        primaryStage.centerOnScreen();

        Stage secondStage = new Stage();
        VBox root1 = new VBox(10);

        root1.setPadding(new Insets(25));
        root1.setAlignment(Pos.CENTER);
        Label label = new Label("I love JavaFX !");
        TextField textField = new TextField("I love JavaFX !");
        TextField textField0 = new TextField("I love JavaFX !");
        root1.getChildren().addAll(label, textField, textField0);
        // permet que le texte du label affiché soit équivalent au texte du texField
        label.textProperty().bind(textField.textProperty());
        //textField.textProperty().bindBidirectional(textField0.textProperty());
        Bindings.bindBidirectional(textField.textProperty(), textField0.textProperty());
        Scene scene1= new Scene(root1, 400 , 400);
        secondStage.setTitle("I love JavaFX !");
        secondStage.setResizable(false);
        secondStage.setScene(scene1);
        secondStage.show();
        secondStage.centerOnScreen();

        //Permet de fermer la fenêtre au bout de 5 secondes
        new Thread(() -> {
           try{
              Thread.sleep(5000);
               Platform.runLater(() -> secondStage.hide());
           } catch(InterruptedException e){
               e.printStackTrace();
           }
        }).start();
    }
}
