/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wishva.phoenix.utils;

import oshi.SystemInfo;

/**
 *
 * @author vishv
 */
public class ClientData {
    
    public String getClientId(){
        SystemInfo systemInfo = new SystemInfo();
        
        String processorId = systemInfo.getHardware().getProcessor().getProcessorIdentifier().getProcessorID();
        String serialNumber = systemInfo.getHardware().getComputerSystem().getSerialNumber();
        
        return processorId + "_" + serialNumber;
    }
}
