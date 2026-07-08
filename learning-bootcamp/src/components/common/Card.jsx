import { motion } from 'framer-motion';

export default function Card({
  title,
  description,
  icon: Icon,
  image,
  gradient = false,
  hover = true,
  className = '',
  children,
  onClick,
}) {
  const Component = onClick ? 'button' : 'div';
  const isButton = onClick !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <Component
        onClick={onClick}
        className={`
          relative overflow-hidden rounded-xl border border-dark-border
          ${gradient
            ? 'bg-gradient-primary'
            : 'glass'
          }
          ${hover && !isButton ? 'card-hover' : ''}
          ${isButton ? 'cursor-pointer text-right w-full card-hover' : ''}
          ${className}
        `.trim()}
      >
        {image && (
          <div className="w-full h-40 overflow-hidden">
            <img
              src={image}
              alt={title || ''}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-5">
          {(Icon || title) && (
            <div className="flex items-start gap-3 mb-3">
              {Icon && (
                <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon size={20} className="text-accent" />
                </div>
              )}
              {title && (
                <h3 className="text-light-text font-bold text-lg">{title}</h3>
              )}
            </div>
          )}

          {description && (
            <p className="text-muted-text text-sm leading-relaxed">{description}</p>
          )}

          {children && <div className="mt-3">{children}</div>}
        </div>

        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        )}
      </Component>
    </motion.div>
  );
}
