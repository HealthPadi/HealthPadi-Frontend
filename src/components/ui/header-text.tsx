//This is the page for the HealthPadi logo and text that is displayed at the top of the application. It is used in the main layout component to provide a consistent header across all pages of the application.

export default function HeaderText() {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-950 flex items-center justify-between p-6 md:p-8">
      <h1 className="font-bold text-yellow-200 text-2xl md:text-3xl">
        HealthPadi
      </h1>
    </header>
  );
}
