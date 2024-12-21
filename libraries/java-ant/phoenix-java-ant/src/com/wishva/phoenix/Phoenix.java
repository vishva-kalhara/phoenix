/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wishva.phoenix;

import com.formdev.flatlaf.themes.FlatMacLightLaf;
import com.wishva.phoenix.services.SubscriptionService;
import com.wishva.phoenix.utils.PhoenixException;
import com.wishva.phoenix.views.FrmNoSubscription;
import com.wishva.phoenix.views.FrmVerifying;
import javax.swing.JFrame;

/**
 *
 * @author vishv
 */
public class Phoenix {

    private JFrame currentFrame = null;

    public Phoenix() throws PhoenixException {

        FlatMacLightLaf.registerCustomDefaultsSource("com.wishva.phoenix.styles");
        FlatMacLightLaf.setup();

        currentFrame = new FrmVerifying();
        currentFrame.setVisible(true);

        try {

            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void protect() throws PhoenixException {

        if (new SubscriptionService().hasValidSubscription()) {
            currentFrame.dispose();
            return;
        }

        currentFrame.dispose();
        currentFrame = new FrmNoSubscription();
        currentFrame.setVisible(true);

        throw new PhoenixException("No Subscription Found.");
    }
}
