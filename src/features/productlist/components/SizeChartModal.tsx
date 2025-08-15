interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/30 backdrop-blur-sm">
      <div className="bg-gray-100 rounded-md w-full max-w-md overflow-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-300 rounded-t-md">
          <button onClick={onClose} className="text-xl font-bold">×</button>
          <h2 className="text-lg font-semibold text-center flex-1">Size Chart</h2>
          <span className="w-5" />
        </div>

        {/* Content */}
        <div className="p-4 text-sm text-gray-800">
          <h3 className="text-center mb-3 font-medium">
            Byford by Pantaloons Men Printed Casual Blue Shirt
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-300 text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Size</th>
                  <th className="p-2 border">Chest</th>
                  <th className="p-2 border">Brand Size</th>
                  <th className="p-2 border">Length</th>
                  <th className="p-2 border">Sleeve Length</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["S", "38", "S", "26.5", "8.5"],
                  ["M", "40", "M", "27.5", "9.5"],
                  ["L", "42", "L", "28.5", "10.5"],
                  ["XL", "44", "XL", "29.5", "10.5"],
                  ["XXL", "46", "XXL", "30.5", "11"],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-2 border">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <h4 className="font-bold mb-2">Measurement Guidelines:</h4>
            <p><strong>Full Sleeve Shirts</strong> Not sure about your shirt size? Follow these simple steps:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Shoulder</strong> – Measure the shoulder at the back, from edge to edge with arms relaxed.</li>
              <li><strong>Chest</strong> – Measure under arms at the fullest chest point.</li>
              <li><strong>Sleeve</strong> – Measure from shoulder seam to cuff.</li>
              <li><strong>Neck</strong> – Measure around the neck base.</li>
              <li><strong>Length</strong> – Measure from shoulder seam to the bottom hem.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
