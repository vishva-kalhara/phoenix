/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JFrame.java to edit this template
 */
package com.wishva.phoenix.views;

import com.formdev.flatlaf.FlatClientProperties;
import com.wishva.phoenix.utils.ClientData;
import com.wishva.phoenix.utils.PhoenixException;
import java.awt.Color;
import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import javax.swing.ImageIcon;
import org.json.JSONObject;

/**
 *
 * @author vishv
 */
public class FrmNoSubscription extends javax.swing.JFrame {

    private String stripeSecret = null;
    private String appSecret = null;
    private String apiKey = null;

    /**
     * Creates new form FrmNoSubscription
     *
     * @param apiKey
     * @param appSecret
     * @param stripeSecret
     */
    public FrmNoSubscription(String apiKey, String appSecret, String stripeSecret) {
        initComponents();

        this.setIconImage(new ImageIcon(getClass().getResource("/com/wishva/phoenix/assets/logo.png")).getImage());

        setDesign();

        this.apiKey = apiKey;
        this.appSecret = appSecret;
        this.stripeSecret = stripeSecret;
    }

    private void setDesign() {
        getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_BACKGROUND, new Color(0, 0, 0));
        getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_FOREGROUND, new Color(0, 0, 0));
        getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_SHOW_CLOSE, false);
        getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_SHOW_MAXIMIZE, false);
        getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_SHOW_ICONIFFY, false);
        getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_SHOW_ICON, false);
        getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_SHOW_TITLE, false);

        btnSubscribe.putClientProperty("JButton.buttonType", "roundRect");
        btnClose.putClientProperty("JButton.buttonType", "roundRect");

        btnClose.putClientProperty("JButton.outline", new Color(30, 30, 30));

    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        btnSubscribe = new javax.swing.JButton();
        btnClose = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setResizable(false);

        jPanel1.setBackground(new java.awt.Color(30, 30, 30));
        jPanel1.setForeground(new java.awt.Color(30, 30, 30));

        jLabel1.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel1.setIcon(new javax.swing.ImageIcon(getClass().getResource("/com/wishva/phoenix/assets/no-subscription-heading.png"))); // NOI18N

        btnSubscribe.setBackground(new java.awt.Color(198, 252, 166));
        btnSubscribe.setFont(new java.awt.Font("Segoe UI Semibold", 0, 16)); // NOI18N
        btnSubscribe.setText("Subscribe Now");
        btnSubscribe.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnSubscribeActionPerformed(evt);
            }
        });

        btnClose.setBackground(new java.awt.Color(30, 30, 30));
        btnClose.setFont(new java.awt.Font("Segoe UI Semibold", 0, 16)); // NOI18N
        btnClose.setForeground(new java.awt.Color(153, 153, 153));
        btnClose.setText("Close");
        btnClose.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnCloseActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jLabel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGap(96, 96, 96)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(btnSubscribe, javax.swing.GroupLayout.PREFERRED_SIZE, 252, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnClose, javax.swing.GroupLayout.PREFERRED_SIZE, 252, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(100, Short.MAX_VALUE))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGap(62, 62, 62)
                .addComponent(jLabel1)
                .addGap(55, 55, 55)
                .addComponent(btnSubscribe, javax.swing.GroupLayout.PREFERRED_SIZE, 56, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(btnClose, javax.swing.GroupLayout.PREFERRED_SIZE, 56, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void btnCloseActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnCloseActionPerformed

        System.exit(0);
    }//GEN-LAST:event_btnCloseActionPerformed

    private void btnSubscribeActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnSubscribeActionPerformed

        try {

            Desktop.getDesktop().browse(new URI(getCheckoutLink()));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }//GEN-LAST:event_btnSubscribeActionPerformed

    private String getCheckoutLink() throws PhoenixException {

        HttpURLConnection connection = null;

        try {

            if (!Desktop.isDesktopSupported() || !Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                throw new PhoenixException("Cannot detect the default browser.");
            }

            URL apiUrl = new URL("http://localhost:3000/api/v1/payments/create-checkout-link");

            connection = (HttpURLConnection) apiUrl.openConnection();

            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + this.apiKey);
            connection.setDoOutput(true); // Enable sending request body

            // Prepare JSON body
            String jsonInputString = "{"
                    + "\"appSecret\":\"" + this.appSecret + "\","
                    + "\"clientId\":\"" + new ClientData().getClientId() + "\","
                    + "\"stripeSecret\":\"" + this.stripeSecret + "\""
                    + "}";

            // Write JSON data to request body
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            switch (responseCode) {

                case HttpURLConnection.HTTP_UNAUTHORIZED:
                    throw new PhoenixException("Unauthorized!");
                case HttpURLConnection.HTTP_NOT_FOUND:
                    throw new PhoenixException("App Not Found!");
                case HttpURLConnection.HTTP_OK:
                    try (BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }

                    JSONObject jsonResponse = new JSONObject(response.toString());

                    return jsonResponse.getString("url");
                }
                case HttpURLConnection.HTTP_BAD_REQUEST:
                    throw new PhoenixException("appSecret, clientId and stripeSecret key required");
                default:
                    throw new PhoenixException("Unhandled Exception Occured! Status Code: " + responseCode);
            }

        } catch (Exception e) {

            if (e.getMessage().equals("Connection refused: connect")) {
                throw new PhoenixException("Please check your internet connection and try again.");
            }
            throw new PhoenixException(e.getMessage());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnClose;
    private javax.swing.JButton btnSubscribe;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JPanel jPanel1;
    // End of variables declaration//GEN-END:variables
}
