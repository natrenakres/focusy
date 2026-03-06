## Project Completion Akışı ve Sidebar Filtreleme

### Özet
Projeye `status` alanı eklenecek; yeni proje her zaman `in_progress` başlayacak. Seçili projedeki taskların hepsi tamamlandığında (ve en az 1 task varsa) `Project Completed` butonu görünecek. Butona basınca proje `completed` olacak. Sidebar’da completed projeler varsayılan gizlenecek, ancak kullanıcı bir toggle ile gösterebilecek.

### Uygulama Değişiklikleri
- **Domain/Store**
  - `ProjectStatus` tipi ekle: `in_progress | completed`.
  - `Project` modeline `status: ProjectStatus` ekle.
  - `createNewProject` içinde default `status = "in_progress"` ata.
  - `normalizeProject` içinde geriye dönük veri uyumu için `status` yoksa `in_progress` set et.
  - Seçili proje için computed’lar ekle:
    - `isSelectedProjectCompletable`: `tasks.length > 0 && tasks.every(t => t.status === "completed")`
    - `canShowProjectCompletedButton`: `selectedProject.status === "in_progress" && isSelectedProjectCompletable`
  - Aksiyon ekle:
    - `markProjectCompleted(projectId)` -> ilgili projeyi `completed` yapar, `lastEdited` günceller, aktif task varsa pasifler.
- **UI/Behavior**
  - `ProjectContent` içinde progress/timer üstünde `Project Completed` butonunu yalnızca `canShowProjectCompletedButton` true iken göster.
  - Buton tıklanınca `markProjectCompleted(selectedProject.id)` çağır.
  - Buton işleminden sonra proje completed olacağı için normal içerik görünümü store filtresine göre güncellenecek.
- **Sidebar filtreleme**
  - `ProjectList` içine lokal filtre state’i ekle: `showCompletedProjects` (default `false`).
  - Listeyi `filteredProjects` computed ile üret:
    - `false` iken sadece `status === "in_progress"`.
    - `true` iken tüm projeler.
  - Sidebar başlığı yanına küçük toggle/button ekle: `Show Completed` / `Hide Completed`.
  - Seçili proje filtre nedeniyle görünmez olursa:
    - `showCompletedProjects = false` ve seçili proje `completed` ise otomatik ilk `in_progress` projeyi seç; yoksa `selectedProjectId = null`.

### Public API / Interface Değişiklikleri
- `Project` kontratı:
  - Yeni zorunlu alan `status`.
- Store exportları:
  - `ProjectStatus` type
  - `markProjectCompleted(projectId: string): void`
  - `isSelectedProjectCompletable`, `canShowProjectCompletedButton` computed’ları
  - (opsiyonel) `inProgressProjects` computed helper (ProjectList için tekrar kullanılabilirlik)

### Test Planı
- Yeni proje oluşturma:
  - `status` her zaman `in_progress`.
- Geriye dönük veri:
  - `status` olmayan localStorage proje kaydı açıldığında `in_progress` normalize edilir.
- Buton görünürlüğü:
  - 0 task -> buton görünmez.
  - En az 1 task ve hepsi completed -> buton görünür.
  - Herhangi bir task completed değil -> buton görünmez.
- Buton aksiyonu:
  - Tıklanınca proje `completed` olur, listeden varsayılan filtrede kaybolur.
- Sidebar filtre:
  - Default: completed projeler görünmez.
  - Toggle açıldığında completed projeler görünür.
  - Toggle kapalıyken seçili proje completed ise selection fallback doğru çalışır.

### Varsayımlar
- “Tüm tasklar bitti” kuralında `tasks.length > 0` şartı zorunlu.
- Completed projeler varsayılan gizli, fakat kullanıcı toggle ile görüntüleyebilir.
- Completed proje tekrar `in_progress`’e döndürme bu kapsamda yok.
