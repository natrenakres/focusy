## Proje İlerlemesi ve Task Bazlı Pomodoro Takibi

### Özet
Kullanıcı hikayesi için, pomodoro tamamlandığında sadece aktif task’ın `pomodoroCount` değeri artacak; proje seviyesinde `toplam gerçekleşen / toplam tahmin` ilerlemesi hesaplanıp üstte progress bar ile gösterilecek. Seçtiğin kurallar uygulanacak: `tek aktif task`, `cap’li yüzde`, `aktif task yoksa sayma`.

### Uygulama Değişiklikleri
- **Domain/Store davranışı**
  - `Task` modelinde `pomodoroCount` alanını fiilen zorunlu kullanım standardına çek (yeni task oluştururken her zaman `0` ile başlat).
  - Proje store’una task aktivasyonu için tek giriş noktası ekle: bir task aktif edildiğinde aynı projedeki diğer task’lar pasife alınır.
  - Proje bazlı hesaplayıcılar ekle:
    - `totalEstimatedPomodoros`
    - `totalActualPomodoros`
    - `progressPercent = min(totalActual, totalEstimated) / totalEstimated * 100` (estimated=0 ise 0)
- **Pomodoro tamamlama entegrasyonu**
  - `usePomodoro` içinde pomodoro fazı tamamlandığında bir callback/event tetikleyecek yapı ekle (break tamamlanınca task artırma yapılmayacak).
  - `ProjectContent` seviyesinde bu callback’i yakalayıp aktif task’a `+1` yaz:
    - Aktif task varsa artır.
    - Aktif task yoksa artırma yapma ve kullanıcıya kısa uyarı göster (toast yoksa geçici metin/badge).
- **UI**
  - `ProjectContent` içinde toolbar/timer üst bölgesine proje progress alanı ekle:
    - `Progress` (shadcn-vue wrapper) + metin: `X / Y pomodoro`
    - Yüzde etiketi opsiyonel ama tavsiye edilir.
  - `TaskItem` aktivasyon click davranışını “toggle” yerine “tek aktif seçimi” kuralına göre güncelle.
  - Mevcut timer mod butonlarında yanlışlıkla sayaç artırabilecek akışı kapat:
    - Faz seçimi ile “pomodoro tamamlandı” aksiyonu ayrıştırılsın (yanlış increment önlenir).

### Public API / Interface Değişiklikleri
- `Task` kullanım kontratı:
  - `pomodoroCount` uygulama genelinde `number` olarak ele alınacak (nullable/undefined değil).
- `useProjectsStore`a yeni aksiyon/hesaplayıcılar:
  - `setActiveTask(taskId)`
  - `incrementActiveTaskPomodoro(projectId)`
  - proje progress computed değerleri (selected project için veya helper fonksiyon olarak)
- `usePomodoro` arayüzü:
  - Pomodoro completion hook/callback (örn. `onPomodoroCompleted`) veya eşdeğer event mekanizması.

### Test Planı
- Aktif task seçildiğinde diğer task’ların pasif olduğunun doğrulanması.
- Pomodoro fazı bittiğinde:
  - aktif task varsa `pomodoroCount +1`
  - aktif task yoksa artış olmaması
- Break fazı bitişinde task artmaması.
- Progress hesapları:
  - normal durum (`actual < estimated`)
  - eşitlik (`actual = estimated`)
  - aşım (`actual > estimated`, yüzde 100’de cap)
  - `estimated = 0` (yüzde 0, crash yok)
- Sayfa yenileme sonrası localStorage ile değerlerin korunması.

### Varsayımlar ve Seçilen Defaultlar
- Aynı anda **yalnızca 1 aktif task** olabilir.
- Proje ilerlemesi tüm task’ların toplamı üzerinden hesaplanır.
- Yüzde **%100 ile sınırlıdır** (cap’li).
- Aktif task yokken tamamlanan pomodoro task’a yazılmaz; kullanıcıya uyarı gösterilir.
