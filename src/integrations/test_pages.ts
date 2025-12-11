import type { AstroIntegration } from "astro";

export default function integration() : AstroIntegration{
    return {
        name: 'my_test_page_router',
        hooks: {
            'astro:config:setup': (params) => {
                console.log('[test_pages] astro:config:setup hook called');
                console.log(`[test_pages] params.command: ${params.command}`);
                if (params.command === 'dev') {
                    console.log('[test_pages] Injecting /_theme_designer route...');
                    params.injectRoute({
                        pattern: '/theme-designer',
                        entrypoint: 'src/pages/_theme-designer.astro',
                    });
                } else {
                    console.log('[test_pages] Not injecting route (not in dev mode)');
                }
            }
        }
    }
}