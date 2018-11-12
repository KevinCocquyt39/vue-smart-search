namespace TestProject
{
    using System.Globalization;
    using System.Web.Optimization;

    public static class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            ArgumentValidation.EnsureNotNull(bundles, "bundles");

            bundles.Add(new ScriptBundle("~/bundles/site").Include(
                "~/scripts/modernizr-build.js",
                "~/scripts/bootstrap.js",
                "~/scripts/site.js"));

            bundles.Add(new ScriptBundle("~/bundles/components").Include(
                "~/scripts/components/vue-smart-search.js",
                "~/scripts/component-filters.js",
                "~/scripts/component-loader.js"));

            bundles.Add(new StyleBundle("~/content/site").Include(
                "~/content/bootstrap.css"
                "~/content/components/vue-smart-search.css"));
        }
    }
}
