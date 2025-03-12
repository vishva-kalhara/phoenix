using Hardware.Info;

namespace Phoenix.Util
{
    public class HardwareInfo
    {
        private readonly IHardwareInfo _hardwareInfo = new Hardware.Info.HardwareInfo();

        /// <summary>
        /// Retrieves unique hardware identifiers, including the processor ID and motherboard serial number.
        /// </summary>
        /// <returns>A string containing the processor ID and motherboard serial number, separated by "__".</returns>
        public string Get()
        {
            _hardwareInfo.RefreshAll();

            // Get Processor ID (CPU serial number)
            string processorId = _hardwareInfo.CpuList[0].ProcessorId;

            // Get Motherboard serial number
            string motherboardSerial = _hardwareInfo.MotherboardList[0].SerialNumber;

            return $"{processorId}__{motherboardSerial}";
        }
    }
}