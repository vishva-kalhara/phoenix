package io.github.wishva.phoenix.util;

import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.ComputerSystem;

/**
 * Utility class to retrieve hardware information from the system.
 */
public class HardwareInfo {

    /**
     * Retrieves unique hardware identifiers, including the processor ID and motherboard serial number.
     *
     * @return A string containing the processor ID and motherboard serial number, separated by "__".
     */
    public static String get(){

        SystemInfo systemInfo = new SystemInfo();
        HardwareAbstractionLayer hardware = systemInfo.getHardware();
        ComputerSystem computerSystem = hardware.getComputerSystem();

        // Get Processor ID (CPU serial number)
        CentralProcessor processor = hardware.getProcessor();
        String processorId = processor.getProcessorIdentifier().getProcessorID();

        // Get Motherboard serial number
        String motherboardSerial = computerSystem.getBaseboard().getSerialNumber();

        return processorId + "__" + motherboardSerial;
    }
}
