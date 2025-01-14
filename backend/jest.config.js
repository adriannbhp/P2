module.exports = {
    testEnvironment: "node", // Gunakan environment Node.js
    collectCoverage: true, // Aktifkan pengumpulan code coverage
    coverageDirectory: "coverage", // Direktori untuk laporan coverage
    coverageReporters: ["json", "lcov", "text", "clover"], // Format laporan coverage
    collectCoverageFrom: [
      "src/**/*.js", // File yang ingin diukur coverage-nya
      "!src/**/*.test.js", // Kecualikan file pengujian
      "!src/server.js", // Kecualikan file server utama
    ],
  };
  