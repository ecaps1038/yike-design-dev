import { onMounted, onUnmounted, onUpdated } from 'vue';
import { throttleAndDebounce } from '../utils/tools';

import type { Ref } from 'vue';

export function useActiveTocLinks(
  container: Ref<HTMLElement>,
  marker: Ref<HTMLElement>,
) {
  const onScroll = throttleAndDebounce(setActiveLink, 150);
  function setActiveLink() {
    const tocLinks = getTocLinks();
    const anchors = getAnchors(tocLinks);

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const nextAnchor = anchors[i + 1];
      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor);
      if (isActive) {
        history.replaceState(
          null,
          document.title,
          hash ? (hash as string) : ' ',
        );
        activateLink(hash as string);
        return;
      }
    }
  }

  let prevActiveLink: HTMLAnchorElement | null = null;

  function activateLink(hash: string) {
    deactiveLink(prevActiveLink);

    const activeLink = (prevActiveLink =
      hash == null
        ? null
        : (container.value.querySelector(
            `.toc-item a[href="${decodeURIComponent(hash)}"]`,
          ) as HTMLAnchorElement));
    if (activeLink) {
      activeLink.classList.add('active');
      marker.value.style.opacity = '1';
      marker.value.style.top = `${activeLink.parentElement.offsetTop + 42}px`;
    } else {
      marker.value.style.opacity = '0';
      marker.value.style.top = '33px';
    }
  }

  function deactiveLink(link: HTMLElement | null) {
    link && link.classList.remove('active');
  }

  onMounted(() => {
    window.requestAnimationFrame(setActiveLink);
    window.addEventListener('scroll', onScroll);
  });

  onUpdated(() => {
    activateLink(location.hash);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });
}
function getTocLinks() {
  return Array.from(
    document.querySelectorAll('.toc .toc-link'),
  ) as HTMLAnchorElement[];
}
function getAnchors(sidebarLinks: HTMLAnchorElement[]) {
  return (
    Array.from(
      document.querySelectorAll('.yk-demo-doc .title-anchor'),
    ) as HTMLAnchorElement[]
  ).filter((anchor) =>
    sidebarLinks.some((sidebarLink) => sidebarLink.hash === anchor.hash),
  );
}
function getPageOffset() {
  return (document.querySelector('.top-bar') as HTMLElement).offsetHeight;
}
function getAnchorTop(anchor: HTMLAnchorElement) {
  const pageOffset = getPageOffset();
  try {
    return (
      anchor.parentElement!.parentElement.parentElement.offsetTop -
      pageOffset * 2
    );
  } catch {
    return 0;
  }
}
function isAnchorActive(
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor: HTMLAnchorElement,
) {
  const scrollTop = window.scrollY;
  if (index === 0 && scrollTop === 0) {
    return [true, null];
  }
  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null];
  }
  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, decodeURIComponent(anchor.hash)];
  }
  return [false, null];
}
