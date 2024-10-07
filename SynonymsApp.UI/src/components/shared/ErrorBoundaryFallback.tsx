function ErrorBoundaryFallback() {
  return  <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something went wrong!</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">There was an error in the app. Please try again later by refreshing the app. If the problem continues contact support.</p>
                </div>   
            </div>
          </section>
}

export default ErrorBoundaryFallback;