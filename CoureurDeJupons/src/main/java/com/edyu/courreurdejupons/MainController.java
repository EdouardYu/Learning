package com.edyu.courreurdejupons;

import com.edyu.courreurdejupons.utils.ApplicationUtils;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;

import java.net.URL;
import java.util.ResourceBundle;

public class  MainController implements Initializable {
    private int totalGirlfriendCount = 0;

    @FXML
    private Label statusLabel;

    @FXML
    protected void handleAddGirlfriendButtonAction(ActionEvent e) {
        updateStatusLabel(++this.totalGirlfriendCount);
    }

    @FXML
    protected void handleRemoveGirlfirendButtonAction(ActionEvent e) {
        if (this.totalGirlfriendCount > 0) {
            updateStatusLabel(--this.totalGirlfriendCount);
        }
    }

    private void updateStatusLabel(int newGirlfriendCount) {
        this.statusLabel.setText("Tu as actuellement " + ApplicationUtils.pluralize(newGirlfriendCount,  "copine") + ".");
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        updateStatusLabel(totalGirlfriendCount);
    }
}
