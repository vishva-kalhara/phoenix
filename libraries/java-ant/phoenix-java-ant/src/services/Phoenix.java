/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package services;

import com.formdev.flatlaf.themes.FlatMacLightLaf;
import views.FrmNoSubscription;

/**
 *
 * @author vishv
 */
public class Phoenix {
    
    public Phoenix(){
        
        FlatMacLightLaf.registerCustomDefaultsSource("styles");
        FlatMacLightLaf.setup();
        
        new FrmNoSubscription().setVisible(true);
    }
}
