export type NotificationType = {
    context: string,
    message: string,
}

export default class Notification {
    private errors: NotificationType[] = []

    getErrors(): NotificationType[] {
        return this.errors
    }

    add(error: NotificationType): void {
        this.errors.push(error)
    }

    hasErrors(): boolean {
        return this.errors.length > 0
    }

    messages(context?: string): string {
        return this.errors
            .filter((error) => context === undefined || error.context === context)
            .map((error) => `${error.context}: ${error.message}`)
            .join(', ')
    }
}