const MapSection = () => {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#2A2A2A]">
      <h2 className="text-white text-2xl font-bold font-instrument mb-4">Location</h2>
      <div className="w-full h-64 rounded-xl overflow-hidden bg-[#2A2A2A] flex items-center justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.5152!3d6.5667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzQnMDAuMiJOIDMwwrAzMCc1NC43IkU!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Event Location Map"
        />
      </div>
      <p className="text-gray-400 mt-3 text-sm">
        34, Ejumbe Street, Ikorodu, Lagos State.
      </p>
    </div>
  );
};

export default MapSection;
