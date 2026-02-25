/**
 * Internationalization (i18n) Support
 * Multi-language support with React Context
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'ko' | 'zh' | 'ar'

// Translation interface
export interface Translations {
  [key: string]: string | Translations
}

// Available translations
const translations: Record<Locale, Translations> = {
  en: {
    common: {
      welcome: 'Welcome',
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      reset: 'Reset'
    },
    nav: {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      blog: 'Blog',
      portfolio: 'Portfolio'
    },
    errors: {
      required: 'This field is required',
      invalidEmail: 'Invalid email address',
      minLength: 'Must be at least {{min}} characters',
      maxLength: 'Must be at most {{max}} characters',
      passwordMismatch: 'Passwords do not match'
    },
    messages: {
      saved: 'Changes saved successfully',
      deleted: 'Item deleted successfully',
      updated: 'Item updated successfully',
      copied: 'Copied to clipboard'
    }
  },
  es: {
    common: {
      welcome: 'Bienvenido',
      loading: 'Cargando...',
      error: 'Ocurrió un error',
      success: 'Éxito',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      next: 'Siguiente',
      previous: 'Anterior',
      submit: 'Enviar',
      reset: 'Restablecer'
    },
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      contact: 'Contacto',
      blog: 'Blog',
      portfolio: 'Portafolio'
    },
    errors: {
      required: 'Este campo es obligatorio',
      invalidEmail: 'Dirección de correo inválida',
      minLength: 'Debe tener al menos {{min}} caracteres',
      maxLength: 'Debe tener como máximo {{max}} caracteres',
      passwordMismatch: 'Las contraseñas no coinciden'
    },
    messages: {
      saved: 'Cambios guardados exitosamente',
      deleted: 'Elemento eliminado exitosamente',
      updated: 'Elemento actualizado exitosamente',
      copied: 'Copiado al portapapeles'
    }
  },
  fr: {
    common: {
      welcome: 'Bienvenue',
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      success: 'Succès',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      close: 'Fermer',
      search: 'Rechercher',
      filter: 'Filtrer',
      sort: 'Trier',
      next: 'Suivant',
      previous: 'Précédent',
      submit: 'Soumettre',
      reset: 'Réinitialiser'
    },
    nav: {
      home: 'Accueil',
      about: 'À propos',
      contact: 'Contact',
      blog: 'Blog',
      portfolio: 'Portfolio'
    },
    errors: {
      required: 'Ce champ est obligatoire',
      invalidEmail: 'Adresse email invalide',
      minLength: 'Doit contenir au moins {{min}} caractères',
      maxLength: 'Doit contenir au plus {{max}} caractères',
      passwordMismatch: 'Les mots de passe ne correspondent pas'
    },
    messages: {
      saved: 'Modifications enregistrées avec succès',
      deleted: 'Élément supprimé avec succès',
      updated: 'Élément mis à jour avec succès',
      copied: 'Copié dans le presse-papiers'
    }
  },
  de: {
    common: {
      welcome: 'Willkommen',
      loading: 'Laden...',
      error: 'Ein Fehler ist aufgetreten',
      success: 'Erfolg',
      cancel: 'Abbrechen',
      confirm: 'Bestätigen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      close: 'Schließen',
      search: 'Suchen',
      filter: 'Filtern',
      sort: 'Sortieren',
      next: 'Weiter',
      previous: 'Zurück',
      submit: 'Absenden',
      reset: 'Zurücksetzen'
    },
    nav: {
      home: 'Startseite',
      about: 'Über',
      contact: 'Kontakt',
      blog: 'Blog',
      portfolio: 'Portfolio'
    },
    errors: {
      required: 'Dieses Feld ist erforderlich',
      invalidEmail: 'Ungültige E-Mail-Adresse',
      minLength: 'Muss mindestens {{min}} Zeichen lang sein',
      maxLength: 'Darf höchstens {{max}} Zeichen lang sein',
      passwordMismatch: 'Passwörter stimmen nicht überein'
    },
    messages: {
      saved: 'Änderungen erfolgreich gespeichert',
      deleted: 'Element erfolgreich gelöscht',
      updated: 'Element erfolgreich aktualisiert',
      copied: 'In die Zwischenablage kopiert'
    }
  },
  it: {
    common: {
      welcome: 'Benvenuto',
      loading: 'Caricamento...',
      error: 'Si è verificato un errore',
      success: 'Successo',
      cancel: 'Annulla',
      confirm: 'Conferma',
      save: 'Salva',
      delete: 'Elimina',
      edit: 'Modifica',
      close: 'Chiudi',
      search: 'Cerca',
      filter: 'Filtra',
      sort: 'Ordina',
      next: 'Avanti',
      previous: 'Indietro',
      submit: 'Invia',
      reset: 'Reimposta'
    },
    nav: {
      home: 'Home',
      about: 'Chi siamo',
      contact: 'Contatto',
      blog: 'Blog',
      portfolio: 'Portfolio'
    },
    errors: {
      required: 'Questo campo è obbligatorio',
      invalidEmail: 'Indirizzo email non valido',
      minLength: 'Deve essere di almeno {{min}} caratteri',
      maxLength: 'Deve essere di al massimo {{max}} caratteri',
      passwordMismatch: 'Le password non corrispondono'
    },
    messages: {
      saved: 'Modifiche salvate con successo',
      deleted: 'Elemento eliminato con successo',
      updated: 'Elemento aggiornato con successo',
      copied: 'Copiato negli appunti'
    }
  },
  pt: {
    common: {
      welcome: 'Bem-vindo',
      loading: 'Carregando...',
      error: 'Ocorreu um erro',
      success: 'Sucesso',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      close: 'Fechar',
      search: 'Pesquisar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      next: 'Próximo',
      previous: 'Anterior',
      submit: 'Enviar',
      reset: 'Redefinir'
    },
    nav: {
      home: 'Início',
      about: 'Sobre',
      contact: 'Contato',
      blog: 'Blog',
      portfolio: 'Portfólio'
    },
    errors: {
      required: 'Este campo é obrigatório',
      invalidEmail: 'Endereço de email inválido',
      minLength: 'Deve ter pelo menos {{min}} caracteres',
      maxLength: 'Deve ter no máximo {{max}} caracteres',
      passwordMismatch: 'As senhas não coincidem'
    },
    messages: {
      saved: 'Alterações salvas com sucesso',
      deleted: 'Item excluído com sucesso',
      updated: 'Item atualizado com sucesso',
      copied: 'Copiado para a área de transferência'
    }
  },
  ja: {
    common: {
      welcome: 'ようこそ',
      loading: '読み込み中...',
      error: 'エラーが発生しました',
      success: '成功',
      cancel: 'キャンセル',
      confirm: '確認',
      save: '保存',
      delete: '削除',
      edit: '編集',
      close: '閉じる',
      search: '検索',
      filter: 'フィルター',
      sort: '並び替え',
      next: '次へ',
      previous: '前へ',
      submit: '送信',
      reset: 'リセット'
    },
    nav: {
      home: 'ホーム',
      about: 'について',
      contact: '連絡先',
      blog: 'ブログ',
      portfolio: 'ポートフォリオ'
    },
    errors: {
      required: 'この項目は必須です',
      invalidEmail: '無効なメールアドレス',
      minLength: '{{min}}文字以上である必要があります',
      maxLength: '{{max}}文字以下である必要があります',
      passwordMismatch: 'パスワードが一致しません'
    },
    messages: {
      saved: '変更を保存しました',
      deleted: '項目を削除しました',
      updated: '項目を更新しました',
      copied: 'クリップボードにコピーしました'
    }
  },
  ko: {
    common: {
      welcome: '환영합니다',
      loading: '로딩 중...',
      error: '오류가 발생했습니다',
      success: '성공',
      cancel: '취소',
      confirm: '확인',
      save: '저장',
      delete: '삭제',
      edit: '편집',
      close: '닫기',
      search: '검색',
      filter: '필터',
      sort: '정렬',
      next: '다음',
      previous: '이전',
      submit: '제출',
      reset: '재설정'
    },
    nav: {
      home: '홈',
      about: '소개',
      contact: '연락처',
      blog: '블로그',
      portfolio: '포트폴리오'
    },
    errors: {
      required: '이 필드는 필수입니다',
      invalidEmail: '잘못된 이메일 주소',
      minLength: '{{min}}자 이상이어야 합니다',
      maxLength: '{{max}}자 이하여야 합니다',
      passwordMismatch: '비밀번호가 일치하지 않습니다'
    },
    messages: {
      saved: '변경사항이 저장되었습니다',
      deleted: '항목이 삭제되었습니다',
      updated: '항목이 업데이트되었습니다',
      copied: '클립보드에 복사되었습니다'
    }
  },
  zh: {
    common: {
      welcome: '欢迎',
      loading: '加载中...',
      error: '发生错误',
      success: '成功',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      close: '关闭',
      search: '搜索',
      filter: '筛选',
      sort: '排序',
      next: '下一步',
      previous: '上一步',
      submit: '提交',
      reset: '重置'
    },
    nav: {
      home: '首页',
      about: '关于',
      contact: '联系',
      blog: '博客',
      portfolio: '作品集'
    },
    errors: {
      required: '此字段为必填项',
      invalidEmail: '无效的电子邮件地址',
      minLength: '必须至少{{min}}个字符',
      maxLength: '必须最多{{max}}个字符',
      passwordMismatch: '密码不匹配'
    },
    messages: {
      saved: '更改已成功保存',
      deleted: '项目已成功删除',
      updated: '项目已成功更新',
      copied: '已复制到剪贴板'
    }
  },
  ar: {
    common: {
      welcome: 'مرحبا',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      success: 'نجح',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تحرير',
      close: 'إغلاق',
      search: 'بحث',
      filter: 'تصفية',
      sort: 'ترتيب',
      next: 'التالي',
      previous: 'السابق',
      submit: 'إرسال',
      reset: 'إعادة تعيين'
    },
    nav: {
      home: 'الرئيسية',
      about: 'حول',
      contact: 'اتصال',
      blog: 'مدونة',
      portfolio: 'معرض الأعمال'
    },
    errors: {
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'عنوان بريد إلكتروني غير صالح',
      minLength: 'يجب أن يكون {{min}} أحرف على الأقل',
      maxLength: 'يجب أن يكون {{max}} أحرف كحد أقصى',
      passwordMismatch: 'كلمات المرور غير متطابقة'
    },
    messages: {
      saved: 'تم حفظ التغييرات بنجاح',
      deleted: 'تم حذف العنصر بنجاح',
      updated: 'تم تحديث العنصر بنجاح',
      copied: 'تم النسخ إلى الحافظة'
    }
  }
}

// Language names in native language
export const languageNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  ar: 'العربية'
}

// Context
interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Provider
interface I18nProviderProps {
  children: ReactNode
  defaultLocale?: Locale
}

export function I18nProvider({ children, defaultLocale = 'en' }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Get from localStorage or browser
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('locale') as Locale
      if (saved && translations[saved]) return saved

      // Check browser language
      const browserLang = navigator.language.split('-')[0] as Locale
      if (translations[browserLang]) return browserLang
    }
    return defaultLocale
  })

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
      document.documentElement.lang = newLocale
    }
  }

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    if (typeof value !== 'string') {
      console.warn(`Translation not found for key: ${key}`)
      return key
    }

    // Replace parameters
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
        return params[param]?.toString() || match
      })
    }

    return value
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

// Hook
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}

/**
 * Language Switcher Component
 */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useI18n()

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none ${className}`}
    >
      {Object.entries(languageNames).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  )
}

export default I18nProvider
