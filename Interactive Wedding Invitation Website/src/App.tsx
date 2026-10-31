import { useEffect, useRef, useState, type ReactNode } from 'react'

const EVENT_DATE = new Date('2026-11-12T20:00:00')

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, EVENT_DATE.getTime() - Date.now())

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  }
}

function Icon({
  children,
  viewBox = '0 0 48 48',
}: {
  children: ReactNode
  viewBox?: string
}) {
  return (
    <svg
      aria-hidden="true"
      className="detail-icon"
      fill="none"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

function CalendarIcon() {
  return (
    <Icon>
      <rect x="7" y="10" width="34" height="31" rx="4" />
      <path d="M15 6v8M33 6v8M7 19h34M15 27h4M24 27h4M33 27h4M15 34h4M24 34h4" />
    </Icon>
  )
}

function ClockIcon() {
  return (
    <Icon>
      <circle cx="24" cy="24" r="18" />
      <path d="M24 13v12l8 5" />
    </Icon>
  )
}

function LocationIcon() {
  return (
    <Icon>
      <path d="M38 20c0 11-14 23-14 23S10 31 10 20a14 14 0 1 1 28 0Z" />
      <circle cx="24" cy="20" r="5" />
    </Icon>
  )
}

function SnapchatIcon() {
  return (
    <Icon>
      <path d="M24 7c-6.4 0-10.2 4.7-10.2 10.7 0 1.7.3 3.6.2 5-1.2 2.4-3.2 3.7-5.6 4.6-.9.3-.9 1.7 0 2.1 1.4.6 2.9 1 4.3 1.3.8.2 1.4.7 1.8 1.4.8 1.5 1.8 2 3.5 1.7 1.4-.2 2.5 2.3 6 2.3s4.6-2.5 6-2.3c1.7.3 2.7-.2 3.5-1.7.4-.7 1-1.2 1.8-1.4 1.4-.3 2.9-.7 4.3-1.3.9-.4.9-1.8 0-2.1-2.4-.9-4.4-2.2-5.6-4.6-.1-1.4.2-3.3.2-5C34.2 11.7 30.4 7 24 7Z" />
    </Icon>
  )
}

function ChildrenIcon() {
  return (
    <Icon>
      <circle cx="17" cy="14" r="4" />
      <circle cx="32" cy="16" r="3.5" />
      <path d="M9 33c0-7 3.2-11 8-11s8 4 8 11M25 34c0-6 2.8-10 7-10 3.7 0 6.3 3 7 8" />
      <path className="icon-accent" d="M7 41 41 7" />
    </Icon>
  )
}

function NoCameraIcon() {
  return (
    <Icon>
      <path d="M8 17h8l3-5h10l3 5h8v23H8V17Z" />
      <circle cx="24" cy="28" r="7" />
      <path className="icon-accent" d="M7 42 41 8" />
    </Icon>
  )
}

function DetailCard({
  icon,
  title,
  children,
  href,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
  href?: string
}) {
  const content = (
    <>
      <span className="icon-wrap">{icon}</span>
      <h3>{title}</h3>
      <div className="detail-copy">{children}</div>
      {href && <span className="detail-link">اضغطي للوصول ←</span>}
    </>
  )

  return href ? (
    <a className="detail-card detail-card-link" href={href} rel="noreferrer" target="_blank">
      {content}
    </a>
  ) : (
    <article className="detail-card">{content}</article>
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const invitationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const openInvitation = () => {
    if (opened) return
    setOpened(true)
    window.setTimeout(() => {
      invitationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 4500)
  }

  return (
    <main className={opened ? 'site is-open' : 'site'} dir="rtl">
      <section className="opening-screen" aria-label="افتحي الدعوة">
        <div className="opening-content">
          <p className="eyebrow">بكل الحب</p>
          <h1 className="invited-title">You're invited</h1>
          <span className="title-flourish" aria-hidden="true">
            <i />
            <b>♥</b>
            <i />
          </span>

          <button
            aria-label="اضغطي لفتح الدعوة"
            aria-pressed={opened}
            className="envelope-button"
            onClick={openInvitation}
            type="button"
          >
            <span className="envelope-surprise" aria-hidden="true">
              <span className="record-piece">
                <img alt="" src="public/invite/record.png" />
                <span>TAP TO PLAY</span>
              </span>
              <span className="photo-piece">
                <img alt="" src="public/invite/couple-hands.webp" />
              </span>
              <span className="names-piece">
                <img alt="" src="public/invite/lace-medallion.png" />
                <span className="names-copy">
                  <small>THE WEDDING OF</small>
                  <strong>إسراء</strong>
                  <i>&amp;</i>
                  <strong>عبد الحفيظ</strong>
                </span>
              </span>
              <span className="date-piece">
                <small>THURSDAY</small>
                <strong>12</strong>
                <span>NOV · 2026</span>
              </span>
            </span>
            <span className="envelope-art">
              <span className="envelope-inside" aria-hidden="true" />
              <img alt="" className="envelope-body" src="/invite/envelope-body.png" />
              <img alt="" className="envelope-real-flap" src="/invite/envelope-flap.png" />
            </span>
            <img alt="" className="wax-seal" src="/invite/seal.png" />
          </button>

          <button className="open-hint" dir="ltr" onClick={openInvitation} type="button">
            <span>{opened ? 'INVITATION OPENED' : 'TAP THE ENVELOPE TO OPEN'}</span>
            {!opened && (
              <svg
                aria-hidden="true"
                className="hint-arrow"
                fill="none"
                viewBox="0 0 72 72"
              >
                <path d="M9 61C33 65 56 48 52 15" />
                <path d="m38 28 14-14 12 15" />
              </svg>
            )}
          </button>
        </div>
      </section>

      <section className="invitation" ref={invitationRef}>
        <div className="section-shell">
          <header className="welcome">
            <span className="mini-flourish">❦</span>
            <p>بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <h2>حكاية تشبه الروايات</h2>
            <div className="poem">
              <p>امتزجت بأجمل الدعوات</p>
              <p>وتكلّلت بأسعد النهايات</p>
              <p>ولا تكتمل فرحتنا إلا بوجود زغاريد الأحباب</p>
            </div>
            <p className="family">تتشرف حرم الحاج / محمد ميلاد المائل</p>
            <p className="honor">بدعوتكم لمشاركتنا فرحة العمر</p>
          </header>

          <div className="couple-heading" aria-label="إسراء وعبد الحفيظ">
            <span>إسراء</span>
            <b>&amp;</b>
            <span>عبد الحفيظ</span>
          </div>

          <div className="details-grid">
            <DetailCard icon={<CalendarIcon />} title="التاريخ">
              <strong>الخميس</strong>
              <span>12 نوفمبر 2026</span>
            </DetailCard>
            <DetailCard icon={<ClockIcon />} title="وقت الحفلة">
              <strong>الساعة 8:00 مساءً</strong>
              <span>ننتظركم بكل شوق</span>
            </DetailCard>
            <DetailCard
              href="https://www.google.com/maps/search/?api=1&query=Royal+Palace+Hall"
              icon={<LocationIcon />}
              title="الموقع"
            >
              <strong>قاعة رويال بلاس</strong>
              <span>يسعدنا وصولكم</span>
            </DetailCard>
            <DetailCard icon={<SnapchatIcon />} title="فلتر الحفلة">
              <strong>شاركونا لحظاتكم</strong>
              <span>فلتر السناب متاح في القاعة</span>
            </DetailCard>
            <DetailCard icon={<ChildrenIcon />} title="لراحة ضيوفنا">
              <strong>إدارة الصالة تمنع</strong>
              <span>اصطحاب الأطفال</span>
            </DetailCard>
            <DetailCard icon={<NoCameraIcon />} title="خصوصية المناسبة">
              <strong>استحلفكم بالله أن تحفظوا خصوصيتي</strong>
              <span>بعدم التصوير</span>
            </DetailCard>
          </div>

          <section className="countdown" aria-label="الوقت المتبقي على الحفل">
            <p className="countdown-kicker">على موعد مع الفرح</p>
            <h2>باقي على ليلتنا</h2>
            <div className="countdown-grid" dir="ltr">
              {[
                ['days', 'يوم'],
                ['hours', 'ساعة'],
                ['minutes', 'دقيقة'],
                ['seconds', 'ثانية'],
              ].map(([key, label]) => (
                <div className="time-unit" key={key}>
                  <strong>{String(timeLeft[key as keyof TimeLeft]).padStart(2, '0')}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <span className="closing-mark">♥</span>
            <p className="closing">حضوركم هو أجمل هدايانا</p>
          </section>
        </div>
      </section>
    </main>
  )
}
